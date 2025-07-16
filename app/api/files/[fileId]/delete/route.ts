import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
});


export async function DELETE(request: NextRequest, props: { params: Promise<{ fileId: string }> }) {
    try {
        const { userId } = await auth();
        if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { fileId } = await props.params;
        if (!fileId) return NextResponse.json({ error: "File ID is required" }, { status: 400 });

        const [file] = await db
            .select()
            .from(files)
            .where(and(eq(files.id, fileId), eq(files.userId, userId)));

        if (!file) {
            return NextResponse.json({ error: "File not found" }, { status: 404 });
        }

        if (!file.isFolder) {
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
                        console.error("Error searching for file", error);
                        await imagekit.deleteFile(imagekitFileId);
                    }
                }
            } catch (error) {
                console.error("Error deleting file", error);
            }
        }

        const [deletedFile] = await db
            .delete(files)
            .where(and(eq(files.id, fileId), eq(files.userId, userId)))
            .returning();

        return NextResponse.json({
            success: true,
            message: "File deleted successfully",
            deletedFile
        })
    } catch (error) {
        console.error("Error deleting file", error);
        return NextResponse.json({
            success: false,
            message: "Failed to delete file",
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}