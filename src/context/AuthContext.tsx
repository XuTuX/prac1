'use clinet';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase'; // src 폴더를 쓴다면 '@/src/lib/firebase'

interface AuthContextType {
    user: User | null;
    loading: boolean;
    idtoken: string | null;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    idtoken: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = React.useState<User | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [idtoken, setIdToken] = React.useState<string | null>(null);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);
            setLoading(false);
            if (user) {
                const token = await user.getIdToken();
                setIdToken(token);
            } else {
                setIdToken(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, idtoken }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);