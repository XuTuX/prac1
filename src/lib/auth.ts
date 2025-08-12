// lib/auth.ts
import { adminAuth } from "./firebaseAdmin";
import { headers } from "next/headers";

export async function verifyFirebaseToken() {
    const headerList = await headers(); // await 필수
    const authHeader = headerList.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) return null;

    const idToken = authHeader.split("Bearer ")[1];
    try {
        const decodedToken = await adminAuth.verifyIdToken(idToken);
        return decodedToken;
    } catch (error) {
        return null;
    }
}
