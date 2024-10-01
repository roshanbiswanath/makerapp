import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"
import bcrypt from 'bcryptjs'
import { z } from "zod"
import { getUserByEmail, getUserByMobile, createUser } from "@/lib/user"
import LinkedIn from "next-auth/providers/linkedin"
import Google from "next-auth/providers/google"
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import Nodemailer from "next-auth/providers/nodemailer"


const loginSchema = z.object({
    identifier: z.string().min(1, "Email or mobile number is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
})

const signupSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    mobile: z.string().regex(/^\d{10}$/, "Invalid mobile number"),
    userType: z.string().min(1, "User type is required"),
    industry: z.string().min(1, "Industry is required"),
    purpose: z.string().min(1, "Purpose is required"),
})

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: MongoDBAdapter(clientPromise, {
        databaseName: "makerHub",
    }),
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/login",
        newUser: "/auth/signup",
        verifyRequest: "/auth/verify-request",
    },
    providers: [
        Nodemailer({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
        }),
        Google({
            allowDangerousEmailAccountLinking: true,
        }),
        LinkedIn,
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                identifier: { label: "Email or Mobile", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) return null;

                try {
                    const { identifier, password } = await loginSchema.parseAsync(credentials);

                    const user = await getUserByEmail(identifier) || await getUserByMobile(identifier);

                    if (!user) return null;

                    const isValidPassword = await bcrypt.compare(password, user.password);

                    if (!isValidPassword) return null;

                    return {
                        id: user._id.toString(),
                        email: user.email,
                        name: `${user.firstName} ${user.lastName}`,
                        image: user.image,
                    };
                } catch (error) {
                    console.error("Auth error:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.picture = user.image;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
            if (token) {
                session.user = {
                    ...session.user,
                    id: token.id as string,
                    email: token.email as string,
                    name: token.name as string,
                    image: token.picture as string,
                };
            }
            return session;
        }

    },
})

export async function customSignUp(userData: z.infer<typeof signupSchema>) {
    const validatedData = await signupSchema.parseAsync(userData);
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    const newUser = await createUser({ ...validatedData, password: hashedPassword });
    return newUser;
}

// export async function verifyMobile(mobile: string, otp: string) {
//     const isValid = await verifyOTP(mobile, otp);
//     if (isValid) {
//         await updateUser({ mobile }, { isVerified: true });
//         return true;
//     }
//     return false;
// }
