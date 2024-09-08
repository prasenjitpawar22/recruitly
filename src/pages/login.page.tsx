import { Center } from '@mantine/core'
import { useEffect, } from 'react'
import { useNavigate } from "react-router-dom";
import { LoginForm } from '../components/forms/login.form';


export function Login() {
    const navigate = useNavigate();

    // check if already logged in
    useEffect(() => {
        const localStorageToken = localStorage.getItem("logged-in");
        if (localStorageToken) navigate('/')
    }, [])

    return <Center h={'100vh'}>
        <LoginForm />
    </Center>
}