// Your web app's Firebase configuration
import {useEffect, useState} from 'react';
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

import {
    onAuthStateChanged as _onAuthStateChanged,
} from "firebase/auth";

// TODO take from env
const firebaseConfig = {
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: ''
};

export const firebaseApp =
    getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(firebaseApp);


const formatAuthUser = (user) => ({
    uid: user.uid,
    email: user.email
});

export const useFirebaseAuth = () => {
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const authStateChanged = async (authState) => {
        if (!authState) {
            setLoading(false)
            return;
        }

        setLoading(true)

        const formattedUser = formatAuthUser(authState);

        setAuthUser(formattedUser);

        setLoading(false);

    };

    const onAuthStateChanged = (cb) => {
        return _onAuthStateChanged(auth, cb);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(authStateChanged);
        return () => unsubscribe();
    }, []);

    return {
        authUser,
        loading,
    };

}