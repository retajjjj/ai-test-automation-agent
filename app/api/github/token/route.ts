import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const cookiestore = await cookies();
    const token = cookiestore.get('github_access_token')?.value;

    return NextResponse.json({ token: token ?? null });
}