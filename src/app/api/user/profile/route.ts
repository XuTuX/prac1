// app/api/user/profile/route.ts
import { prisma } from "@/lib/prisma"; // 경로 확인!
import { verifyFirebaseToken } from "@/lib/auth"; // 경로 확인!
import { NextResponse } from 'next/server';

export async function GET() {
    const decodedToken = await verifyFirebaseToken();
    if (!decodedToken) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { uid: firebaseUid } = decodedToken;

    const userProfile = await prisma.userProfile.upsert({
        where: { firebaseUid },
        update: {}, // 기존 프로필이 있으면 아무것도 변경하지 않음
        create: {
            firebaseUid,
            nickname: decodedToken.name || `User-${firebaseUid.slice(0, 5)}`, // Google 이름 또는 임시 닉네임
            ticketBalance: 3 // 신규 가입 시 초기 티켓 3장 지급
        }
    });

    return NextResponse.json(userProfile);
}