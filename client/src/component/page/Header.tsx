import {useContext, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AiOutlineMenu} from 'react-icons/ai'
import {AiOutlineClose} from 'react-icons/ai'
import {BsFillSunFill} from 'react-icons/bs'
import {MdNightlight} from 'react-icons/md'

import Logo from "../logo/Logo";
import {routePath} from "../../setup/route/RoutePath";
import {AuthContext, UIContent} from "../../setup/context/Context";
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
    const uiCtx = useContext(UIContent)
    const dispatch = useAppDispatch();
    const {loadProjects} = useProject()

    const logout = () => {
        authCtx.logout();
        dispatch(projectAction.logout());
        navigate('/')
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
        if (baseVal.includes('darkMode')) {
            window.document.documentElement.classList.add('dark')
            window.document.documentElement.classList.remove('light')
            uiCtx.setLogoProperties({
                width: '40%',
                color: '#FFFFFF',
            })
        } else if (baseVal.includes('lightMode')) {
            document.documentElement.classList.add('light');
            document.documentElement.classList.remove('dark');
            uiCtx.setLogoProperties({
                width: '40%',
                color: '#000',
            })
        }
        switchModel()
    }

    const switchModel = () => {
        const className = document.documentElement.className;
        if (className === 'dark') {
            // @ts-ignore
            getElement('lightMode.sm').style.display = 'block'
            // @ts-ignore
            getElement('darkMode.sm').style.display = 'none'
            // @ts-ignore
            getElement('lightMode.lg').style.display = 'block'
            // @ts-ignore
            getElement('darkMode.lg').style.display = 'none'
        }
        else {
            // @ts-ignore
            getElement('darkMode.sm').style.display = 'block'
            // @ts-ignore
            getElement('lightMode.sm').style.display = 'none'
            // @ts-ignore
            getElement('darkMode.lg').style.display = 'block'
            // @ts-ignore
            getElement('lightMode.lg').style.display = 'none'
        }
    }

    const init = () => {
        let elementLG = getElement('lightMode.lg')
        let elementSM = getElement('lightMode.sm')
        if (elementLG !== null || elementSM !== null) {
            // @ts-ignore
            elementLG.style.display = 'none'
            // @ts-ignore
            elementSM.style.display = 'none'
        }
        elementLG = getElement('darkMode.lg');
        elementSM = getElement('darkMode.sm');

        if (elementLG !== null || elementSM !== null) {
            // @ts-ignore
            elementLG.style.display = 'none'
            // @ts-ignore
            elementSM.style.display = 'none'
        }
        switchModel()
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
                <div className="largeDevices linkContainer sm:hidden md:hidden lg:flex xl:flex">
                    <ul className={'grid-cols-10'}>
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
                    <div className="modeContainer">
                        <BsFillSunFill className='lightMode lg' onClick={() => toggleMode('lightMode.lg')}/>
                        <MdNightlight className='darkMode lg' onClick={() => toggleMode('darkMode.lg')}/>
                    </div>
                </div>
                <div className="smallDevices linkContainer sm:grid md:grid lg:hidden xl:hidden">
                    <div className="actionContainer">
                        <div className="icon_container">
                            <AiOutlineMenu className='showDropdown' onClick={() => toggleMode('showDropdown')}/>
                        </div>
                        <div className="modeContainer">
                            <BsFillSunFill className='lightMode sm' onClick={() => toggleMode('lightMode.sm')}/>
                            <MdNightlight className='darkMode sm' onClick={() => toggleMode('darkMode.sm')}/>
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