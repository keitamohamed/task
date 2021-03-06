import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {BiDotsHorizontal} from "react-icons/bi";

import {AuthContext} from "../context/Context";
import Logo from "../app_logo/Logo";
import {SEND_REQUEST} from "../../action/request";

let loginForm = null
let signupForm = null

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
    const [credError, setCredError] = useState({
        email: '',
        password: '',
        message: ''
    })
    const [conformPassword, setConformPassword] = useState({
        conformPassword: '',
        error: '',
        passwordMissMatch: ''
    })
    const [accountCreated, setAccountCreated] = useState({})

    const setLoginCredential = userCredential => {
        if (userCredential.code === '406' || userCredential.code === '400') {
            setError(userCredential)
        } else {
            authCtx.setUserCredential(userCredential)
            navigate('/dashboard')
        }
    }

    const sendRegistrationCredential = message => {
        setAccountCreated(message)
    }

    const setError = error => {
        const {email, password} = error
        if (error.response) {
            setCredError({
                ...error,
                message: error.response.data.message
            })
        } else {
            setCredError({
                ...error,
                email,
                password,
            })
        }
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

    const onChangeLogin = event => {
        setLogin({
            ...login,
            [event.target.name]: event.target.value
        })
    }

    const onChangeRegister = event => {
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

    const getElement = (name) => {
        const element = document.querySelector(`.${name}`)
        return element ? element : null
    }

    const formAction = (openElement, closeElement) => {
        closeElement.setAttribute('closing', '')
        closeElement.addEventListener('animationend', () => {
            closeElement.setAttribute('closed', '')
            closeElement.removeAttribute('closing')
            closeElement.removeAttribute('open')
        }, {once: true})
        openElement.removeAttribute('closed')
        openElement.setAttribute('open', '')
    }

    const onSubmitLogin = event => {
        event.preventDefault()
        dispatch(SEND_REQUEST("login", login, setLoginCredential, setError, null))
    }

    const onSubmitRegister = event => {
        event.preventDefault()
        setRegister({
            ...register,
            auth: auth
        })
        if (passwordValidation() === false) {
            return
        }
        dispatch(SEND_REQUEST(`user/register`, register, sendRegistrationCredential, setError, null))
    }

    useEffect(() => {
        if (loginForm === null || signupForm === null) {
            loginForm = getElement('loginContent')
            signupForm = getElement('signupContent')
        }

        if (loginForm.hasAttributes('open')) {
            signupForm = getElement('signupContent')
            loginForm = getElement('loginContent')
        }
        loginForm.setAttribute('open', '')
        setCredError({})
    }, [loginForm, signupForm])

    return (
        <div className='login'>
            <div className="main">
                <div className="positionLeft">
                    <div className="logoContainer">
                        <strong>
                            <Link to={'/'}>
                                <Logo fontWidth={'30%'} color={'#FFF'}/>
                            </Link>
                        </strong>
                    </div>
                    <div className="content">
                        <h2>Designed for individuals</h2>
                        <p>See the analytics and your data remotely from anywhere. Stay on
                            track & hit targets for task completions!</p>
                        <BiDotsHorizontal/>
                    </div>
                </div>
                <div className="positionRight">
                    <div className="content">
                        <div className="loginContent">
                            <div className="titleContainer">
                                <h2>Login</h2>
                            </div>
                            <div className="formContainer">
                                <form action=""
                                      onSubmit={onSubmitLogin}
                                      className="form">
                                    <div className="formGroup">
                                        <p>Email</p>
                                        <input type="email"
                                               name="email"
                                               className={credError.email ? 'error' : ''}
                                               onChange={onChangeLogin}
                                               placeholder={credError.email ? credError.email : 'Email'}
                                        />
                                    </div>
                                    <div className="formGroup">
                                        <p>Password</p>
                                        <input type="password"
                                               name="password"
                                               className={credError.password ? 'error' : ''}
                                               onChange={onChangeLogin}
                                               placeholder={credError.password ? credError.password : 'Password'}
                                        />
                                    </div>
                                    <div className="formGroup">
                                        {
                                            credError.message !== '' ? <p className='inputError error_message'>{credError.message}</p> : ''
                                        }
                                    </div>
                                    <div className="formGroup">
                                        <input type="submit"
                                               value='Login'/>
                                        <li>{`Don't have an account?`} <span onClick={
                                            () => formAction(signupForm, loginForm)}>Sign up</span>
                                        </li>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="signupContent">
                            <div className="titleContainer">
                                <h2>Signup</h2>
                            </div>
                            <div className="formContainer">
                                <form action=""
                                      onSubmit={onSubmitRegister}
                                      className="form">
                                    <div className="formGroup">
                                        <p>First name</p>
                                        <input type="text"
                                               name="firstName"
                                               className={credError.error && credError.error.firstName ? 'inputError' : ''}
                                               onChange={onChangeRegister}
                                               placeholder={credError.error && credError.error.firstName ?
                                                   credError.error.firstName : 'First name'}
                                        />
                                    </div>
                                    <div className="formGroup">
                                        <p>Last name</p>
                                        <input type="text"
                                               name="lastName"
                                               className={credError.error && credError.error.lastName ? 'inputError' : ''}
                                               onChange={onChangeRegister}
                                               placeholder={credError.error && credError.error.lastName ?
                                                   credError.error.lastName : 'Last name'}
                                        />
                                    </div>
                                    <div className="formGroup">
                                        <p>Email</p>
                                        <input type="email"
                                               name="email"
                                               className={credError.error && credError.error['auth.email'] ? 'inputError' : ''}
                                               onChange={onChangeRegister}
                                               placeholder={credError.error && credError.error['auth.email'] ?
                                                   credError.error['auth.email'] : 'Email'}
                                        />
                                    </div>
                                    <div className="formGroup">
                                        <p>Password</p>
                                        <input type="password"
                                               name="password"
                                               autoComplete='new-password'
                                               className={credError.error && credError.error['auth.password'] ? 'inputError' : ''}
                                               onChange={onChangeRegister}
                                               placeholder={credError.error && credError.error['auth.password'] ?
                                                   credError.error['auth.password'] : 'password'}
                                        />
                                    </div>
                                    <div className="formGroup">
                                        <p>Conform password</p>
                                        <input type="password"
                                               name='conformPassword'
                                               className={conformPassword.error ? 'inputError' : ''}
                                               onChange={onChangeRegister}
                                               placeholder= {conformPassword.error ?
                                                   conformPassword.error : 'Conform Password'}
                                        />
                                    </div>
                                    <div className="formGroup">
                                        <input type="submit"
                                               value='Register'/>
                                        <li>{`Have an account?`} <span onClick={
                                            () => formAction(loginForm, signupForm)}>Login</span>
                                        </li>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login