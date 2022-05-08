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
    const  navigate = useNavigate();
    const dispatch = useDispatch();
    const authCtx = useContext(AuthContext)
    const [login, setLogin] = useState({
        email: '',
        password: ''
    })
    const [register, setRegister] = useState({
        firstName: '',
        lastName: '',
        'auth': null
    })
    const [auth, setAuth] = useState()
    const [credError, setCredError] = useState()
    
    const setLoginCredential = userCredential => {
        authCtx.setUserCredential(userCredential)
        navigate('/dashboard')
    }

    const sendRegistrationCredential = message => {
        console.log(message)
    }

    const setError = error => {
        console.log(error)
        setCredError(error)
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
            return
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
        dispatch(SEND_REQUEST("POST", "login", login, setLoginCredential, setError))
    }

    const onSubmitRegister = event => {
        event.preventDefault()
        setRegister({
            ...register,
            ['auth']: auth
        })
        dispatch(SEND_REQUEST("POST", `user/register`, register, sendRegistrationCredential, setError, null))
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
    }, [loginForm, signupForm])

    return (
        <div className='login'>
            <div className="main">
                <div className="positionLeft">
                    <div className="logoContainer">
                        <strong>
                            <Link to={'/'}>
                                <Logo fontWidth={'30%'} color={'#FFF'} />
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
                                               onChange={onChangeLogin}
                                               placeholder='Email'
                                        />
                                    </div>
                                    <div className="formGroup">
                                        <p>Password</p>
                                        <input type="password"
                                               name="password"
                                               onChange={onChangeLogin}
                                               placeholder='Password'
                                        />
                                    </div>
                                    <div className="formGroup">
                                        <input type="submit"
                                               value='Login' />
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
                                               onChange={onChangeRegister}
                                               placeholder='First name'
                                        />
                                    </div>
                                    <div className="formGroup">
                                        <p>Last name</p>
                                        <input type="text"
                                               name="lastName"
                                               onChange={onChangeRegister}
                                               placeholder='Last name'
                                        />
                                    </div>
                                    <div className="formGroup">
                                        <p>Email</p>
                                        <input type="email"
                                               name="email"
                                               onChange={onChangeRegister}
                                               placeholder='Email'
                                        />
                                    </div>
                                    <div className="formGroup">
                                        <p>Password</p>
                                        <input type="password"
                                               name="password"
                                               onChange={onChangeRegister}
                                               placeholder='Password'
                                        />
                                    </div>
                                    <div className="formGroup">
                                        <p>Conform password</p>
                                        <input type="password"
                                               name='pConform'
                                               placeholder='Conform Password'
                                        />
                                    </div>
                                    <div className="formGroup">
                                        <input type="submit"
                                               value='Register' />
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