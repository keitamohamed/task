const Login = () => {

    return (
        <div className='login'>
            <div className="main">
                <div className="positionLeft"></div>
                <div className="positionRight">
                    <div className="content">
                        <div className="titleContainer">
                            <h2>Login</h2>
                        </div>
                        <div className="formContainer">
                            <form action="" className="form">
                                <div className="formGroup">
                                    <p>Email Address:</p>
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
                                </div>
                                <div className="formGroup"></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login