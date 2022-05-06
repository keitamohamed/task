import {useContext, useEffect} from "react";
import {useNavigate, Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {BsPlus} from 'react-icons/bs'
import moment from "moment";

import {GET_REQUEST, SEND_REQUEST} from "../../action/request";
import {projectAction} from "../../store/project_slice";
import {taskAction} from "../../store/task_slice";
import {AuthContext} from "../context/Context";

const Dashboard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const authCtx = useContext(AuthContext)
    const {taskDue} = useSelector((state) => state.task)

    const setDueTask = (url, id, response) => {
        if (url.includes('task-due-soon')) {
            dispatch(taskAction.setTaskDue(response))
        }
        else {
            dispatch(taskAction.loadTask(response))
        }
    }

    const setProjects = (url, id, response) => {
        if (id !== null) {
            dispatch(projectAction.selectedProject(response))
        }
        else {
            dispatch(projectAction.loadProject(response))
        }
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

    const setCustomError = error => {
    }

    useEffect(() => {
        const {userID, email, accessToken} = authCtx.cookie
        console.log("userID", userID, "email", email, "token", accessToken)
        dispatch(SEND_REQUEST('POST', 'user/custom-data', email,
            customData, setError, accessToken))
        // dispatch(GET_REQUEST(`user/${userID}/projects`, userID, accessToken, setProjects, setError))
        // dispatch((GET_REQUEST('project/task-due-soon', userID, accessToken, setDueTask, setTaskErrorMessage)))
        // dispatch(GET_REQUEST('project/find-all-project', null, null, setProduct, setError))
    }, [dispatch])
    return (
        <div className={`dashboard`}>
            <div className="sidebar">
                <nav className="sidebarNav">
                    <ul>
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
                </nav>
            </div>
            <div className="mainContent">
                <div className="contentButtonContainer">
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