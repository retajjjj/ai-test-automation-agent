import { db, repositories } from "@/db";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { repoId, globalInstruction, targetDomain } = body;

    if (!repoId || !globalInstruction || !targetDomain) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const updatedSettings = await db.update(repositories).set({
        globalInstruction,
        targetDomain,
    }).where(eq(repositories.id, repoId)).returning();
    return NextResponse.json(updatedSettings[0]);
}
    