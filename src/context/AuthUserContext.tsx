import {createContext, useContext, useEffect} from 'react'
import {useFirebaseAuth} from '@/utils/firebase';
import {Spin} from 'antd';
import {usePathname, useRouter} from 'next/navigation';

const authUserContext = createContext({
    authUser: null,
    loading: true
});

export function AuthUserProvider({ children } : { children: React.ReactNode }) {
    const auth = useFirebaseAuth();

    const path = usePathname();
    const router = useRouter();

    const redLogin = () => {
        if (!auth.loading && !auth.authUser && path !== '/') {
            router.push('/');
            return false;
        };

        return !auth.loading;
    }

    useEffect(() => {
        console.log('path', path);
        redLogin();
    }, [path, auth.authUser, auth.loading]);

    if(!redLogin()) return <Spin spinning  size={"large"}  fullscreen />;


    return <authUserContext.Provider value={{
        authUser: auth.authUser,
        loading: auth.loading
    }}>
        {children}
    </authUserContext.Provider>;
}

// custom hook to use the authUserContext and access authUser and loading
export const useAuth = () => useContext(authUserContext);