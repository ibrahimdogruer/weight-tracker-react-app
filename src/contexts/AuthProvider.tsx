import React, { useEffect, useState } from "react";

import { auth } from "../firebase";
import firebaseAuth from "firebase/auth";
import { onAuthStateChanged } from 'firebase/auth'

type ContextProps = {
    user: firebaseAuth.User | null;
    authenticated: boolean;
    setUser: any;
    loadingAuthState: boolean;
};

export const AuthContext = React.createContext<Partial<ContextProps>>({});

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState(null as firebaseAuth.User | null);
    const [loadingAuthState, setLoadingAuthState] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, (user: any) => {
            setUser(user);
            setLoadingAuthState(false);
            console.log(user, 'user');
            console.log(user !== null, 'authenticated');
        });
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                authenticated: user !== null,
                setUser,
                loadingAuthState
            }}>
            {children}
        </AuthContext.Provider>
    );
}
