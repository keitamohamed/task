import {useContext, useEffect} from "react";
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {BsPlus} from "react-icons/bs";

import Header from "./Header";
import Notification from "../../notification/Notification";
import DisplayProject from "./sub-component/ProjectPost";
import NoData from "./sub-component/NoData";
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

    const setProductTask = (response) => {
        dispatch(taskAction.loadTask(response))
    }

    const setErrorMessage = (error) => {
        dispatch(taskAction.setError(error))
    }

    const setProjects = (url, id, response) => {
        dispatch(projectAction.loadProject(response))
    }

    const setProject = (response) => {
        dispatch(projectAction.selectedProject(response))
    }

    const setError = (error) => {
        dispatch(projectAction.setError(error))
    }

    const setProjectAndTasks = (identifier) => {
        const {accessToken} = authCtx.cookie
        dispatch(GET_REQUEST(`project/find-by-identifier/${identifier}`, setProject, setError, accessToken))
        dispatch(GET_REQUEST(`project/project-task/${identifier}`, setProductTask, setErrorMessage, accessToken))
    }

    const selectedProject = (identifier) => {
        const {accessToken} = authCtx.cookie
        dispatch(GET_REQUEST(`project/find-by-identifier/${identifier}`, setProject, setError, accessToken))
    }

    const deleteProject = (identifier) => {
        notification.setConformationNotifications({
            title: 'Delete Project',
            identifier: identifier,
            message: `Are you sure you want to permanently delete project ${identifier}?`,
            showBtn: true,
            showNotification: true
        })
        notificationAction(messageNotification)
    }

    const notificationAction = (openElement) => {
        openElement.removeAttribute('closed')
        openElement.setAttribute('open', '')
    }

    useEffect(() => {
        const {userID, accessToken} = authCtx.cookie
        if (!isLoaded) {
            dispatch(GET_REQUEST(`user/${userID}/projects`, userID, setProjects, setError, accessToken))
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
                        projects.length > 0 ?
                        <DisplayProject
                        projects={projects}
                        numberOfPost={2}
                        selectedProject={selectedProject}
                        deleteProject={deleteProject}
                        setProjectTask={setProjectAndTasks}/>
                            : <NoData text={`No projects to display`}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default Project