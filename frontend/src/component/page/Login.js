import {BiDotsHorizontal} from "react-icons/bi";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import Logo from "../app_logo/Logo";

const Login = () => {
    let loginForm = null
    let signupForm = null

    const getElement = (name) => {
        const element = document.querySelector(`.${name}`)
        return element ? element : null
    }

    const formAction = (openElement, closeElement) => {
        closeElement.setAttribute('closing', '')
        closeElement.addEventListener('animationend', () => {
            closeElement.setAttribute('closed', '')
            closeElement.removeAttribute('closing')
        }, {once: true})
        openElement.removeAttribute('closed')
        openElement.setAttribute('open', '')
    }

    useEffect(() => {
        loginForm = getElement('loginContent')
        signupForm = getElement('signupContent')

        loginForm.setAttribute('open', '')
    }, [])

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
                                <form action="" className="form">
                                    <div className="formGroup">
                                        <p>Email</p>
                                        <input type="email"
                                               placeholder='Email'
                                        />
                                    </div>
                                    <div className="formGroup">
                                        <p>Password</p>
                                        <input type="password"
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
                                <form action="" className="form">
                                    <div className="formGroup">
                                        <p>First name</p>
                                        <input type="text"
                                               placeholder='First name'
                                        />
                                    </div>
                                    <div className="formGroup">
                                        <p>Last name</p>
                                        <input type="text"
                                               placeholder='Last name'
                                        />
                                    </div>
                                    <div className="formGroup">
                                        <p>Email</p>
                                        <input type="email"
                                               placeholder='Email'
                                        />
                                    </div>
                                    <div className="formGroup">
                                        <p>Password</p>
                                        <input type="password"
                                               placeholder='Password'
                                        />
                                    </div>
                                    <div className="formGroup">
                                        <p>Conform password</p>
                                        <input type="password"
                                               placeholder='Password'
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