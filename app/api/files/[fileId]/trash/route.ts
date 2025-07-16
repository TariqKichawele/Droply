import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";



export async function PATCH(request: NextRequest, props: { params: Promise<{ fileId: string }> }) {
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
          
        const [updatedFile] = await db
            .update(files)
            .set({ isTrash: !file.isTrash })
            .where(and(eq(files.id, fileId), eq(files.userId, userId)))
            .returning();
          
        const action = updatedFile.isTrash ? "moved to trash" : "restored";
        return NextResponse.json({
            ...updatedFile,
            message: `File ${action} successfully`,
        });
    } catch (error) {
        console.error("Error trashing file", error);
        return NextResponse.json({
            success: false,
            message: "Failed to trash file",
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}