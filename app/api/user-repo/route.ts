import { db, repositories } from "@/db";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const repo = await req.json();
    try{
        const newRepo = await db.insert(repositories).values({
            id: repo.id,
            name: repo.name,
            full_name: repo.full_name,
            description: repo.description,
            html_url: repo.html_url,
            private: repo.private,
            language: repo.language,
            owner: repo.owner
        }).returning();
        return NextResponse.json({repo: newRepo[0]});
    } catch (error) {
        console.error('Error inserting repository:', error);
        throw new Error('Failed to insert repository');
    }
}

export async function GET(req:NextRequest) {
    const {searchParams} = new URL(req.url);
    const userID=1;
    const result= await db.select().from(repositories).where(eq(repositories.userid, userID));
    return NextResponse.json(result);
}