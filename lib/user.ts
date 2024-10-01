import { ObjectId } from 'mongodb';
import clientPromise from "@/lib/mongodb";

export interface UserData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    mobile: string;
    userType: string;
    industry: string;
    purpose: string;
    isVerified?: boolean;
    image?: string;
}

export interface UserFilter {
    _id?: ObjectId;
    email?: string;
    mobile?: string;
}

export interface UserUpdate {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    mobile?: string;
    userType?: string;
    industry?: string;
    purpose?: string;
    isVerified?: boolean;
    image?: string;
}

export async function getUserByEmail(email: string) {
    const client = await clientPromise;
    const db = client.db();
    return db.collection('users').findOne({ email });
}

export async function getUserByMobile(mobile: string) {
    const client = await clientPromise;
    const db = client.db();
    return db.collection('users').findOne({ mobile });
}

export async function createUser(userData: UserData) {
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('users').insertOne(userData);
    return result.insertedId;
}

export async function updateUser(filter: UserFilter, update: UserUpdate) {
    const client = await clientPromise;
    const db = client.db();
    return db.collection('users').updateOne(filter, { $set: update });
}
