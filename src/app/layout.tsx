'use client';
import './globals.css';
import {AntdRegistry} from '@ant-design/nextjs-registry';
import {useEffect} from 'react';
import {usePathname, useRouter} from 'next/navigation';
import {AuthUserProvider, useAuth} from '@/context/AuthUserContext';


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {


    return (
        <html lang="en">
        <body
        >
        <AntdRegistry>
            <AuthUserProvider>
                {children}
            </AuthUserProvider>
        </AntdRegistry>
        </body>
        </html>
    );
}
