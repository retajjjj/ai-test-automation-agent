// integrate auth with db
import {db} from "@/db";
import {users} from "@/db/schema";
import {eq} from "drizzle-orm";
import {currentUser} from "@clerk/nextjs/server";
import {NextRequest} from "next/server";
import {NextResponse} from "next/server";

export async function POST(req: NextRequest) {
    const user = await currentUser();
    try{
        const userResult = await db.select().from(users).where(eq(users.email, user?.primaryEmailAddress?.emailAddress ?? ''))
        if(userResult.length === 0){
            const newUser = await db.insert(users).values({
                name: user?.firstName ?? '',
                email: user?.primaryEmailAddress?.emailAddress ?? '',
            }).returning();
            return NextResponse.json({user: newUser[0]});
        }
        else{
            return NextResponse.json({user: userResult[0]});
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: 'Failed to create or retrieve user'}, {status: 500});
    }
}