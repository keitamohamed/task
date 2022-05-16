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
import DisplayProject from "./sub-component/ProjectPost";
import NoData from "./sub-component/NoData";
import ProjectContainer from "./sub-component/ProjectContainer";
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

    const selectedProject = (identifier) => {
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