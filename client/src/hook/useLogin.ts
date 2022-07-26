import {ChangeEvent, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../setup/store/ReduxHook";
import {POST_REQUEST} from "../api/Request";
import {CredentialsType, CredError, Login} from "../component/interface/interface";
import {AuthContext} from "../setup/context/Context";

let loginForm: Element | null
let signupForm: Element | null

export const useLogin = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const authCtx = useContext(AuthContext)
    const [login, setLogin] = useState({
        email: '',
        password: ''
    })
    const [register, setRegister] = useState({
        firstName: '',
        lastName: '',
        auth: {}
    })
    const [auth, setAuth] = useState({
        email: '',
        password: ''
    })
    const [loginError, setLoginError] = useState<Login>({
        email: '',
        password: ''
    })
    const [responseMessage, setResponseMessage] = useState<CredError>({
        firstName: '',
        lastName: '',
        message: '',
        auth: {
            email: '',
            password: ''
        }

    })
    const [conformPassword, setConformPassword] = useState({
        conformPassword: '',
        error: '',
        passwordMissMatch: ''
    })

    const setLoginCredential = (userCredential: CredentialsType) => {
        if (userCredential.code === '406' || userCredential.code === '400') {
            setError(userCredential)
        } else {
            // authCtx.setUserCredential(userCredential)
            navigate('/dashboard')
        }
    }

    const sendRegistrationCredential = (message: string) => {
        console.log(message)
        // setAccountCreated(message)
    }

    const setError = (error: any) => {
        const {email, password, message, code} = error
        if (code === '406' && email) {
            setLoginError({
                ...loginError,
                email,
                password
            })
        }
        if (error.response) {
            setResponseMessage({
                ...error,
                message: error.response.data.message
            })
        }
    }

    const setRegistrationError = (error: any) => {
        const {firstName, lastName} = error.error
        const respAuth = error.error

        setResponseMessage({
            ...responseMessage,
            firstName,
            lastName,
            auth: {
                ...auth,
                email: respAuth['auth.email'],
                password: respAuth['auth.password']
            }
        })
    }

    const passwordValidation = () => {
        if (!auth.password) {
            return
        }
        if (!conformPassword.conformPassword) {
            setConformPassword({
                ...conformPassword,
                error: 'Conform password is required'
            })
            return false
        }
        if (conformPassword.conformPassword !== auth.password) {
            setConformPassword({
                ...conformPassword,
                error: '',
                passwordMissMatch: 'Password confirmation does not match.'
            })
            return false
        }
        return true
    }

    const onChangeLogin = (event: ChangeEvent<HTMLInputElement>) => {
        setLogin({
            ...login,
            [event.target.name]: event.target.value
        })
    }

    const onChangeRegister = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === 'email' || event.target.name === 'password') {
            setAuth({
                ...auth,
                [event.target.name]: event.target.value
            })
            setRegister({
                ...register,
                auth: auth
            })
            return
        }else if (event.target.name === 'conformPassword') {
            setConformPassword({
                ...conformPassword,
                [event.target.name]: event.target.value
            })
            return;
        }
        setRegister({
            ...register,
            [event.target.name]: event.target.value
        })
    }

    const getElement = (name: string) => {
        const element = document.querySelector(`.${name}`)
        return element ? element : null
    }

    const toggleBetweenLoginAndSignup = (openElement: Element | null, closeElement: Element | null) => {
        closeElement?.setAttribute('closing', '')
        closeElement?.addEventListener('animationend', () => {
            closeElement.setAttribute('closed', '')
            closeElement.removeAttribute('closing')
            closeElement.removeAttribute('open')
        }, {once: true})
        openElement?.removeAttribute('closed')
        openElement?.setAttribute('open', '')
        setLoginError({
            email: "", password: ""
        })
        setResponseMessage({
            auth: {email: "", password: ""}, firstName: "", lastName: "", message: ""
        })
    }

    const onSubmitLogin = async (event: any) => {
        event.preventDefault()
        // @ts-ignore
        dispatch(POST_REQUEST("login", login, setLoginCredential, setError, null))
    }

    const onSubmitRegister = (event: any) => {
        event.preventDefault()
        setRegister({
            ...register,
            auth: auth
        })
        if (passwordValidation() === false) {
            return
        }
        // @ts-ignore
        dispatch(POST_REQUEST(`user/register`, register, sendRegistrationCredential, setRegistrationError, null))
    }

    useEffect(() => {
        if (!loginForm || !signupForm) {
            loginForm = getElement('loginContent')
            signupForm = getElement('signupContent')
        }
        // @ts-ignore
        if (loginForm?.hasAttributes('open')) {
            signupForm = getElement('signupContent')
            loginForm = getElement('loginContent')
        }
        // @ts-ignore
        loginForm?.setAttribute('open', '')
        setResponseMessage({
            auth: {email: "", password: ""},
            firstName: "",
            lastName: "",
            message: ""
        })
    }, [])

    return {
        onChangeLogin,
        onChangeRegister,
        toggleBetweenLoginAndSignup,
        onSubmitLogin,
        onSubmitRegister,
        loginError,
        loginForm,
        signupForm,
        conformPassword,
        responseMessage
    }

}