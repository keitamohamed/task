import {useContext, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AiOutlineMenu} from 'react-icons/ai'
import {AiOutlineClose} from 'react-icons/ai'
import {BsFillSunFill} from 'react-icons/bs'
import {MdNightlight} from 'react-icons/md'

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
        loadProjects()
        navigate('/project')
    }

    const getElement = (name: string): HTMLElement | null => {
        return document.querySelector(`.${name}`);
    }
    
    const toggleMode = (className: string) => {
        let element = getElement(className)
        // @ts-ignore
        const close: HTMLElement = element?.closest('div')?.querySelector(`svg:not(.${element?.className.baseVal})`)
        if (element && close) {
            element.style.display = 'none'
            close.style.display = 'block'
        }
        const dropDown = getElement('dropdown');
        // @ts-ignore
        const baseVal = element?.className.baseVal;

        if (baseVal === 'showDropdown' && dropDown) {
            dropDown?.removeAttribute('closed')
            dropDown.setAttribute('open', '')
        } else if (dropDown && baseVal === 'hideDropdown'){
            dropDown.style.transform = 'translateX(0)'
            dropDown?.setAttribute('closing', '')
            dropDown?.addEventListener('animationend', () => {
                dropDown.setAttribute('closed', '')
                dropDown.removeAttribute('closing')
                dropDown.removeAttribute('open')
            },{once: true})
        }
        if (baseVal === 'darkMode') {
            window.document.documentElement.classList.add('dark')
        } else if (baseVal === 'lightMode') {
            document.documentElement.classList.remove('dark')
        }
    }

    const init = () => {
        let element = getElement('lightMode')
        if (element) {
            element.style.display = 'none'
        }
    }


    useEffect(() => {
        init()
    }, [])

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
                <div className="largeDevices linkContainer sm:hidden md:hidden lg:grid xl:grid">
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
                <div className="smallDevices linkContainer sm:grid md:grid lg:hidden xl:hidden">
                    <div className="actionContainer">
                        <div className="icon_container">
                            <AiOutlineMenu className='showDropdown' onClick={() => toggleMode('showDropdown')}/>
                        </div>
                        <div className="modeContainer">
                            <BsFillSunFill className='lightMode' onClick={() => toggleMode('lightMode')}/>
                            <MdNightlight className='darkMode' onClick={() => toggleMode('darkMode')}/>
                        </div>
                    </div>
                    <div className="dropdown">
                        <div className="closeBtnContainer">
                            <AiOutlineClose className='hideDropdown' onClick={() => toggleMode('hideDropdown')}/>
                        </div>
                        <ul>
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
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header