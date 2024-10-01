import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { auth } from '@/app/auth';
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
    try {
        const { newPassword } = await req.json();
        const session = await auth();

        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        const hashedPassword = await hash(newPassword, 10);

        const client = await clientPromise;
        const db = client.db();

        await db.collection('users').updateOne(
            { email: session.user.email },
            { $set: { password: hashedPassword } }
        );

        return NextResponse.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error changing password:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
