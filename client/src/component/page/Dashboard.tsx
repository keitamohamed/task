import {Link, useNavigate} from "react-router-dom";

import {AiOutlineClose, AiOutlineMenu} from "react-icons/ai";
import {BsPlus} from "react-icons/bs"

import Logo from "../logo/Logo";
import {useDashboard} from "../../hook/useDashboard";
import moment from "moment";
import NoData from "../sub_component/NoDate";
import {useContext} from "react";
import {UIContent} from "../../setup/context/Context";

export const Dashboard = () => {
    const navigate = useNavigate()
    const uiCtx = useContext(UIContent)
    const {toggleMenu, taskDue, openMenu, closeMenu} = useDashboard()

    const navigateTo = (to: string) => {
        uiCtx.setLogoProperties({width: '45%', color: '#000'})
        navigate(to)
    }
    return (
        <>
            <div className={`dashboard`}>
                <div className="sidebar">
                    <nav className="sidebarNav">
                        <ul className="largeDevices">
                            <div className="contentTop">
                                <li>
                                    <Link to={'/'}>
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <li
                                        onClick={() => navigateTo('/task')}>
                                        Project
                                    </li>
                                </li>
                                <li>Tasks</li>
                            </div>
                            <div className="contentBottom">
                                <li>Teams</li>
                                <li>Engineering</li>
                                <li>Marking</li>
                                <li>Sale</li>
                            </div>
                        </ul>
                        <ul className="smallDevices">
                            <div className="logoContainer">
                                <strong>
                                    <Link to={'/'}>
                                        <Logo width={'50%'} color={'#FFF'} />
                                    </Link>
                                </strong>
                            </div>
                            <ul className="dropdown">
                                <li className="icons">
                                    <AiOutlineMenu
                                        className='openMenu'
                                        onClick={() => toggleMenu(closeMenu, openMenu)}  />
                                    <AiOutlineClose
                                        className='closeMenu'
                                        onClick={() => toggleMenu(openMenu, closeMenu)} />
                                </li>
                                <div className="dropdownContent">
                                    <ul>
                                        <li><Link to='' onClick={() => navigateTo('/project')}>Project</Link></li>
                                        <li><Link to={""}>Task</Link></li>
                                        <li><Link to={""}>Team</Link></li>
                                    </ul>
                                </div>
                            </ul>
                        </ul>
                    </nav>
                </div>
                <div className="mainContent">
                    <div className="contentButtonContainerPlus">
                        <li>
                            <BsPlus
                                style={{color: '#557B83'}}
                                onClick={() => navigate("/new-project")}
                            />
                            <br/>
                            <span>New Project</span>
                        </li>
                    </div>
                    <div className="taskDueContainer">
                        <div className="titleContainer">
                            <h5>Tasks Due Soon</h5>
                            <i>All tasks</i>
                        </div>
                        <div className="taskContainer">
                            {
                                taskDue.length > 0 ? (
                                    <div className="content">
                                        <ul>
                                            {
                                                taskDue.map((task, index) => {
                                                    return <li
                                                        key={index}
                                                        className={'taskDue'}
                                                    >
                                                        <span>{task.summary}</span>
                                                        <span>{moment(task.dueDate).format('MMM DD YYYY')}</span>
                                                    </li>
                                                })
                                            }
                                        </ul>
                                    </div>
                                ): <NoData message={`No tasks to display`} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}