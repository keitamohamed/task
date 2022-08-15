import {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import Logo from "../logo/Logo";
import {routePath} from "../../setup/route/RoutePath";
import {AuthContext} from "../../setup/context/Context";
import {useAppDispatch} from "../../setup/store/ReduxHook";
import {projectAction} from "../../setup/slice/project";
import {useProject} from "../../hook/useProject";

interface Props {
    width: string | undefined,
    color: string | undefined
}

const Header = (props: Props) => {
    const navigate = useNavigate()
    const authCtx = useContext(AuthContext)
    const dispatch = useAppDispatch();
    const {loadProjects} = useProject()

    const logout = () => {
        authCtx.logout();
        dispatch(projectAction.logout());
        navigate('/')
    }

    const navigateTo = (to: string) => {
        console.log("click " + to)
        loadProjects()
        navigate('/project')
    }

    return (
        <header className='header md:z-10 sm:z-10'>
            <nav>
                <div className="logoContainer">
                    <strong>
                        <Link to={'/'}>
                            <Logo width={props.width} color={props.color} />
                        </Link>
                    </strong>
                </div>
                <div className="linkContainer">
                    {
                        routePath.map((link, index) => {
                            if (link.protected && authCtx.getCookie().taskToken && link.showLink) {
                                return (<Link key={`${link.name}_${index}`}
                                              to={link.path}
                                >
                                    {link.name}
                                </Link>)
                            }
                            if (!link.protected && !authCtx.getCookie().taskToken && link.showLink) {
                                return (<Link key={index} to={link.path} >{link.name}</Link>)
                            }
                        })
                    }
                    {
                        authCtx.getCookie().taskToken ? <li onClick={logout}>logout </li> : ''
                    }
                </div>
            </nav>
        </header>
    )
}

export default Header