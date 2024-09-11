'use client';

import React, {useEffect, useState} from 'react';
import {Form, Input, Button, Card, Alert} from 'antd';
import {useAuth} from '@/context/AuthUserContext';
import {useRouter} from 'next/navigation';
import {signInWithEmailAndPassword} from '@firebase/auth';
import {auth} from '@/utils/firebase';

const Login = () => {

    const {authUser, loading} = useAuth();
    const router = useRouter();

    const [message, setMessage] = useState<{
        type: 'success' | 'error' | undefined,
        content: string
    }>({
        type: undefined,
        content: ''
    })

    // Listen for changes on loading and authUser, redirect if needed
    useEffect(() => {
        if (authUser) {
            console.log('authUser',authUser);
            router.push('/dashboard')
        }
    }, [authUser])


    const onFinish = (values: any) => {
        console.log('Success:', values);
        signInWithEmailAndPassword(auth, values.username, values.password)
            .then((userCredential) => {
                console.log('userCredential', userCredential);
                setMessage({
                    type: 'success',
                    content: "Connexion réussie"
                })
                router.push('/dashboard')
            })
            .catch((error) => {
                console.log('error', error);
                setMessage({
                    type: 'error',
                    content: "Identifiants invalides"
                })
            });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div

            className={'flex-col flex mt-10 items-center h-screen'}
        >

            <div
                className={'text-2xl mb-4'}>
                CloudNord
            </div>
            <Card title="Login" style={{width: 300}}>

                {message.content && <Alert message={message.content} type={message.type} showIcon/>}

                <Form
                    name="login"
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="username"
                        rules={[{required: true, message: 'Please input your Username!'}]}
                    >
                        <Input placeholder="Partner code" autoFocus/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{required: true, message: 'Please input your Password!'}]}
                    >
                        <Input.Password placeholder="Password"/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Login;