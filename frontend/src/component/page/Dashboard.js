import {useContext, useEffect, useState} from "react";
import {useNavigate, Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {BsPlus} from 'react-icons/bs'
import {AiOutlineMenu, AiOutlineClose} from "react-icons/ai";
import moment from "moment";

import Logo from "../app_logo/Logo";

import {GET_REQUEST, SEND_REQUEST} from "../../action/request";
import {projectAction} from "../../store/project_slice";
import {taskAction} from "../../store/task_slice";
import {AuthContext} from "../context/Context";

const Dashboard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const authCtx = useContext(AuthContext)
    const [isUserIDExist, setIsUserIDExist] = useState(false);
    const {taskDue} = useSelector((state) => state.task)

    const setDueTask = (url, id, response) => {
        dispatch(taskAction.setTaskDue(response))
    }

    const setProjects = (url, id, response) => {
        dispatch(projectAction.loadProject(response))
    }

    const setTaskErrorMessage = (error) => {
        dispatch(taskAction.setError(error.response.data))
    }

    const setError = (error) => {
        dispatch(projectAction.setError(error.response.data))
    }

    const customData = (data) => {
        authCtx.setUserIDAndName(data)
    }

    const setCustomError = error => {}

    useEffect(() => {
        const {userID, email, accessToken} = authCtx.cookie
        dispatch(SEND_REQUEST('POST', 'user/custom-data', email,
            customData, setCustomError, accessToken))
        if (userID && !isUserIDExist) {
        dispatch(GET_REQUEST(`user/${userID}/projects`, userID, accessToken, setProjects, setError))
            setIsUserIDExist(true)
        }
        dispatch(GET_REQUEST(`user/${userID}/task-due-soon`, userID, accessToken, setDueTask, setTaskErrorMessage))
    }, [dispatch, authCtx.cookie])
    return (
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
                                <Link
                                    to='/project'>
                                    Project</Link>
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
                                    <Logo fontWidth={'50%'} color={'#FFF'} />
                                </Link>
                            </strong>
                        </div>
                        <ul className="dropdown">
                            <li className="icons">
                                <AiOutlineMenu/>
                                <AiOutlineClose/>
                            </li>
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
                        <div className="content">
                            <ul>
                                {
                                    taskDue !== null ? (
                                        taskDue.map((task, index) => {
                                            return <li
                                                key={index}
                                                className={'taskDue'}
                                            >
                                                <span>{task.summary}</span>
                                                <span>{moment(task.dueDate).format('MMM DD YYYY')}</span>
                                            </li>
                                        })
                                    ) : ''
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;