import {useContext, useEffect} from "react";
import {useNavigate, Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import moment from 'moment'
import {AiFillDelete} from 'react-icons/ai'
import {FiCheckSquare} from 'react-icons/fi'
import {MdDashboard} from 'react-icons/md'
import {ImDatabase} from 'react-icons/im'
import {BsPlus} from "react-icons/bs";

import Header from "./Header";
import Notification from "../../notification/Notification";
import {GET_REQUEST} from "../../action/request";
import {AuthContext, NotificationContext} from "../context/Context";
import {projectAction} from "../../store/project_slice";
import {taskAction} from "../../store/task_slice";

let isLoaded = false;
let messageNotification = null

const Project = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const authCtx = useContext(AuthContext)
    const {projects} = useSelector((state) => state.project)
    const notification = useContext(NotificationContext)

    const setProductTask = (url, id, response) => {
        dispatch(taskAction.loadTask(response))
    }

    const setErrorMessage = (error) => {
        dispatch(taskAction.setError(error.response.data))
    }

    const setProjects = (url, id, response) => {
        dispatch(projectAction.loadProject(response))
    }

    const setProject = (url, id, response) => {
        dispatch(projectAction.selectedProject(response))
    }

    const setError = (error) => {
        dispatch(projectAction.setError(error.response.data))
    }

    const setProjectAndTasks = (identifier) => {
        const {accessToken} = authCtx.cookie
        dispatch(GET_REQUEST(`project/find-by-identifier/${identifier}`, identifier, accessToken, setProject, setError))
        dispatch(GET_REQUEST(`project/project-task/${identifier}`, identifier, accessToken, setProductTask, setErrorMessage))
    }

    const getProjects = (identifier) => {
        const {accessToken} = authCtx.cookie
        dispatch(GET_REQUEST('project/find-by-identifier/', identifier, accessToken, setProject, setError))
    }

    const deleteProject = (identifier) => {
        notification.setConformationNotifications({
            title: 'Delete Project',
            identifier: identifier,
            message: `Are you sure you want to permanently delete project ${identifier}?`,
            showBtn: true,
            // showNotification: true
        })
        notificationAction(messageNotification)
    }

    const navigateTo = to => {
        navigate(to)
    }

    const notificationAction = (openElement) => {
        openElement.removeAttribute('closed')
        openElement.setAttribute('open', '')
    }

    useEffect(() => {
        const {userID, accessToken} = authCtx.cookie
        if (!isLoaded) {
            dispatch(GET_REQUEST(`user/${userID}/projects`, userID, accessToken, setProjects, setError))
            isLoaded = true
        }
        if (messageNotification === null) {
            messageNotification = document.querySelector(".notification")
        }
    }, [projects, messageNotification])

    return (
        <div className='project'>
            <Header width={'60%'}/>
            <Notification/>
            <div className="mainContainer">
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
                <div className="projectsContainer">
                    {
                        projects ? projects.map((project, index) => {
                            return (
                                <div className="projectContent"
                                     key={index}>
                                    <div className="contentLeft">
                                        <p>{project.identifier}</p>
                                    </div>
                                    <div className="contentMiddle">
                                        <div className="context">
                                            <h2>{project.name}</h2>
                                            <p>{project.description}</p>
                                            <p className='projectDate'>
                                                {`Start Date: ${moment(project.start).format('MMM DD YYYY')} - 
                                                Due Date: ${moment(project.endDate).format('MMM DD YYYY')}`}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="contentRight">
                                        <Link to={`/project/board/${project.identifier}`} onClick={() => setProjectAndTasks(project.identifier)}>
                                            <MdDashboard style={{color: '#0093AB'}} />
                                            <span>Project Board</span>
                                        </Link>
                                        <Link
                                            to={`/project/update/${project.id}`}
                                            onClick={() => getProjects(project.identifier)}
                                        >
                                            <FiCheckSquare style={{color: '#019267'}} />
                                            <span>Update Project</span>
                                        </Link>
                                        <Link to={``} onClick={() => deleteProject(project.identifier)}>
                                            <AiFillDelete style={{color: '#E83A14'}} />
                                            <span>Delete Project</span>
                                        </Link>
                                    </div>
                                </div>
                            )
                        }) : (<ImDatabase/>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Project