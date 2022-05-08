import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {AuthContext} from "../context/Context";
import routePath from "../../route/RoutePath";
import Logo from "../app_logo/Logo";
import {useContext} from "react";

import {projectAction} from "../../store/project_slice";

const Header = ({width, color}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const authCtx = useContext(AuthContext)

    const navigateTo = to => {
        navigate(to)
    }

    const logout = () => {
        authCtx.logout()
        dispatch(projectAction.logout())
        navigateTo('/')
    }
    return (
        <header className={'appHeader'}>
            <nav>
                <div className="logoContainer">
                    <strong>
                        <Link to={'/'}>
                            <Logo fontWidth={width} />
                        </Link>
                    </strong>
                </div>
                <div className="linkContainer">
                    {
                        routePath.map((link, index) => {
                            if (link.protected && authCtx.cookie.accessToken && link.showLink) {
                                return (<Link key={index} to={link.path} value={link.name} >
                                    {link.name}
                                </Link>)
                            }
                            if (!link.protected && !authCtx.cookie.accessToken && link.showLink) {
                                return (<Link key={index} to={link.path} value={link.name} >{link.name}</Link>)
                            }
                        })
                    }
                    {
                        authCtx.cookie.accessToken ? <li onClick={logout}>logout </li> : ''
                    }
                </div>
            </nav>
        </header>
    )

}

export default Header