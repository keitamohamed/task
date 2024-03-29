import {ChangeEvent, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {useAppDispatch} from "../setup/store/ReduxHook";
import {POST_REQUEST, GET_REQUEST, LOGIN_REQUEST} from "../api/Request";
import {CredentialsType, CredError, Login} from "../interface_type/interface"
import {AuthContext} from "../setup/context/Context";
import {ApiPath} from "../api/URLPath";

let loginForm: Element | null
let signupForm: Element | null

export const useLogin = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const authCtx = useContext(AuthContext)
    const [login, setLogin] = useState<{email: string, password: string}>({
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

    const setLoginCredential = async (userCredential: CredentialsType) => {
        if (userCredential.code === '406' || userCredential.code === '400') {
            setError(userCredential)
        } else {
            authCtx.setCredentials(userCredential)
            // @ts-ignore
            await dispatch(GET_REQUEST(userCredential.taskAccessToken,`${ApiPath.GET_CUSTOM_DATA}/${userCredential.email}`, setCustomDate, setError))
            navigate('/dashboard')
        }
    }
    
    const setCustomDate = (customData: {userID: string, name: string}) => {
        authCtx.setUserNameID(customData)
    }
    
    const setUserNameID = (userCredential: CredentialsType) => {
        // @ts-ignore
        dispatch(GET_REQUEST(userCredential.taskAccessToken,`${ApiPath.GET_CUSTOM_DATA}/${userCredential.email}`, setCustomDate, setError))
    }

    const sendRegistrationCredential = (message: string) => {
        console.log(message)
        // setAccountCreated(message)
    }

    const setError = (error: any) => {
        console.log(error)
        const {email, password, code} = error
        if (code === '406' && email) {
            setLoginError({
                ...loginError,
                email,
            })
        }
        if (code === '406' && password) {
            setLoginError({
                ...loginError,
                password
            })
            return
        }
        if (error) {
            setResponseMessage({
                ...error,
                message: error.message
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
        dispatch(LOGIN_REQUEST(login, setLoginCredential, setError))
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
        dispatch(POST_REQUEST(ApiPath.REGISTER, register, sendRegistrationCredential, setRegistrationError, null))
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