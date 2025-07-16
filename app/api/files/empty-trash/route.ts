import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
});

export async function DELETE() {
    try {
        const { userId } = await auth();
        if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const trashedFiles = await db
            .select()
            .from(files)
            .where(and(eq(files.userId, userId), eq(files.isTrash, true)));

        if (trashedFiles.length === 0) {
            return NextResponse.json({ message: "No files in trash" }, { status: 200 });
        }

        const deletePromises = trashedFiles
            .filter((file) => !file.isFolder)
            .map(async (file) => {
                try {
                    let imagekitFileId = null;

                    if (file.fileUrl) {
                        const urlWithoutQuery = file.fileUrl.split("?")[0];
                        imagekitFileId = urlWithoutQuery.split("/").pop();
                    }

                    if (!imagekitFileId && file.path) {
                        imagekitFileId = file.path.split("/").pop();
                    }

                    if (imagekitFileId) {
                        try {
                            const searchResults = await imagekit.listFiles({
                                name: imagekitFileId,
                                limit: 1
                            });

                            if (searchResults && searchResults.length > 0) {
                                // Type assertion to handle ImageKit's type definition limitations
                                const firstResult = searchResults[0] as { fileId?: string; id?: string };
                                const deleteId = firstResult.fileId || firstResult.id;
                                if (deleteId) {
                                    await imagekit.deleteFile(deleteId);
                                } else {
                                    await imagekit.deleteFile(imagekitFileId);
                                }
                            } else {
                                await imagekit.deleteFile(imagekitFileId);
                            }
                        } catch (error) {
                            console.error("Error deleting file", error);
                            await imagekit.deleteFile(imagekitFileId);
                        }
                    } 
                } catch (error) {
                    console.error(`Error deleting file ${file.id}`, error);
                }
            });

            await Promise.allSettled(deletePromises);

            const deletedFiles = await db
                .delete(files)
                .where(and(eq(files.userId, userId), eq(files.isTrash, true)))
                .returning();

            return NextResponse.json({
                success: true,
                message: `${deletedFiles.length} files deleted successfully`,
            })
    } catch (error) {
        console.error("Error emptying trash", error);
        return NextResponse.json({
            success: false,
            message: "Failed to empty trash",
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}