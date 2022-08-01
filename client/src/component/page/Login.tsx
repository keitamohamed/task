import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import {BiDotsHorizontal} from "react-icons/bi";

import {useLogin} from "../../hook/useLogin";
import Logo from "../logo/Logo";

export const Login = () => {

    const {
        onChangeLogin,
        onChangeRegister,
        onSubmitLogin,
        toggleBetweenLoginAndSignup,
        onSubmitRegister,
        loginError,
        loginForm,
        signupForm,
        conformPassword,
        responseMessage
    } = useLogin()
    const [logoProp, setLogoProp] = useState({
        width: '20%',
        color: '#FFF'
    })

    useEffect(() => {

    }, [responseMessage])


    return (
        <div className='login'>
            <div className="main">
                <div className="positionLeft">
                    <div className="logoContainer">
                        <strong>
                            <Link to={'/'}>
                                <Logo width={logoProp.width} color={logoProp.color}/>
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
                                               className={loginError.email !== '' ? 'error' : ''}
                                               onChange={onChangeLogin}
                                               placeholder={loginError.email !== '' ? loginError.email : 'Email'}
                                        />
                                    </div>
                                    <div className="formGroup">
                                        <p>Password</p>
                                        <input type="password"
                                               name="password"
                                               className={loginError.password !== '' ? 'error' : ''}
                                               onChange={onChangeLogin}
                                               placeholder={loginError.password !== '' ? loginError.password : 'Password'}
                                        />
                                    </div>
                                    <div className="formGroup">
                                        {
                                            responseMessage.message !== '' ? <p className='inputError error_message'>{responseMessage.message}</p> : ''
                                        }
                                    </div>
                                    <div className="formGroup">
                                        <input type="submit"
                                               value='Login'/>
                                        <li>{`Don't have an account?`} <span onClick={
                                            () => toggleBetweenLoginAndSignup(signupForm, loginForm)}>Sign up</span>
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
                                               className={responseMessage.firstName ? 'inputError' : ''}
                                               onChange={onChangeRegister}
                                               placeholder={responseMessage.firstName ?
                                                   responseMessage.firstName : 'First name'}
                                        />
                                    </div>
                                    <div className="formGroup">
                                        <p>Last name</p>
                                        <input type="text"
                                               name="lastName"
                                               className={responseMessage && responseMessage.lastName ? 'inputError' : ''}
                                               onChange={onChangeRegister}
                                               placeholder={responseMessage && responseMessage.lastName ?
                                                   responseMessage.lastName : 'Last name'}
                                        />
                                    </div>
                                    <div className="formGroup">
                                        <p>Email</p>
                                        <input type="email"
                                               name="email"
                                               className={responseMessage.auth?.email ? 'inputError' : ''}
                                               onChange={onChangeRegister}
                                               placeholder={responseMessage.auth?.email ? responseMessage.auth.email : 'Email'}
                                        />
                                    </div>
                                    <div className="formGroup">
                                        <p>Password</p>
                                        <input type="password"
                                               name="password"
                                               autoComplete='new-password'
                                               className={responseMessage.auth?.password ? 'inputError' : ''}
                                               onChange={onChangeRegister}
                                               placeholder={responseMessage.auth?.password ?
                                                   responseMessage.auth.password : 'password'}
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
                                            () => toggleBetweenLoginAndSignup(loginForm, signupForm)}>Login</span>
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