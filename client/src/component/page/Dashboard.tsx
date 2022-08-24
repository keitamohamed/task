import {Link, useNavigate} from "react-router-dom";

import {AiOutlineClose, AiOutlineMenu} from "react-icons/ai";
import {BsPlus} from "react-icons/bs"

// import Logo from "../logo/Logo";
import {useDashboard} from "../../hook/useDashboard";
import moment from "moment";
import NoData from "../sub_component/NoDate";
import {useContext, useEffect} from "react";
import {AuthContext, UIContent} from "../../setup/context/Context";
import {projectAction} from "../../setup/slice/project";
import {useAppDispatch} from "../../setup/store/ReduxHook";
import Header from "./Header";

export const Dashboard = () => {
    const navigate = useNavigate()
    const authCtx = useContext(AuthContext)
    const uiCtx = useContext(UIContent)
    const dispatch = useAppDispatch();
    const {toggleMenu, taskDue, openMenu, closeMenu} = useDashboard()

    const navigateTo = (to: string) => {
        uiCtx.setLogoProperties({width: '45%', color: '#000'})
        navigate(to)
    }

    const logout = () => {
        authCtx.logout();
        dispatch(projectAction.logout());
        navigate('/')
    }

    return (
        <>
            <Header width={'40%'} color={undefined} />
            <div className={`dashboard`}>
                <div className="sidebar sm:hidden lg:grid xl:grid">
                    <nav className="sidebarNav">
                        <ul className="largeDevices">
                            <div className="contentTop">
                                <li onClick={() => navigateTo('/task')}>
                                    Project
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
                    </nav>
                </div>
                <div className="mainContent">
                    <div className="contentButtonContainerPlus">
                        <li>
                            <BsPlus
                                style={{color: '#557B83'}}
                                onClick={() => navigate("/add")}
                            />
                            <br/>
                            <span>New Project</span>
                        </li>
                    </div>
                    <div className="taskDueContainer sm:!w-full">
                        <div className="titleContainer">
                            <h5>Tasks Due Soon</h5>
                            <i>All tasks</i>
                        </div>
                        <div className="taskContainer sm:w-full">
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