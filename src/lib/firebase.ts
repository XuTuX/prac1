import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// .env.local 환경변수 불러오기

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// 서버사이드 렌더링 시 중복 초기화를 방지하는 코드입니다.
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// 우리가 사용할 Firebase 인증 객체를 export 합니다.
export const auth = getAuth(app);