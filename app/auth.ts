import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import LinkedIn from "next-auth/providers/linkedin"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"


export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            allowDangerousEmailAccountLinking: true,
        }),
        LinkedIn
    ],
    adapter: MongoDBAdapter(clientPromise, {
        databaseName: "makerHub",
    }),
    pages: {
        signIn: "/auth/login",
    },
    session: {
        strategy: "database",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },
})
