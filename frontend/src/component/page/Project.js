import {useContext, useEffect} from "react";
import {useNavigate, Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import moment from 'moment'
import {AiFillDelete} from 'react-icons/ai'
import {FiCheckSquare} from 'react-icons/fi'
import {MdDashboard} from 'react-icons/md'
import {ImDatabase} from 'react-icons/im'

import Header from "./Header";
import Notification from "../../notification/Notification";
import {GET_REQUEST, DELETE_REQUEST} from "../../action/request";
import {NotificationContext} from "../context/Context";
import {projectAction} from "../../store/project_slice";
import {taskAction} from "../../store/task_slice";

let isLoaded = false;
const Project = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {projects} = useSelector((state) => state.project)
    const notification = useContext(NotificationContext)


    const setProductTask = (url, id, response) => {
        dispatch(taskAction.loadTask(response))
    }
    const setErrorMessage = (error) => {
        dispatch(taskAction.setError(error.response.data))
    }

    const setProduct = (url, id, response) => {
        if (id !== null) {
            dispatch(projectAction.selectedProject(response))
        }
        else {
            dispatch(projectAction.loadProject(response))
        }
    }

    const setError = (error) => {
        dispatch(projectAction.setError(error.response.data))
    }

    const getProjectTask = (identifier) => {
        dispatch(GET_REQUEST('project/project-task/', identifier, null, setProductTask, setErrorMessage))
    }

    const getProjects = (id, identifier) => {
        dispatch(GET_REQUEST('project/find-by-identifier/', identifier, null, setProduct, setError))
    }

    const deleteProject = (identifier) => {
        notification.setConformationNotifications({
            title: 'Delete Project',
            identifier: identifier,
            message: `Are you sure you want to permanently delete project ${identifier}?`,
            showBtn: true,
            showNotification: true
        })
    }

    const navigateTo = to => {
        navigate(to)
    }

    useEffect(() => {
        if (!isLoaded) {
            dispatch(GET_REQUEST('project/find-all-project', null, null, setProduct, setError))
            isLoaded = true
        }
    }, [projects])

    return (
        <div className='project'>
            <Header/>
            <Notification/>
            <div className="mainContainer">
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
                                        <Link to={`/project/board/${project.id}`} onClick={() => getProjectTask(project.identifier)}>
                                            <MdDashboard style={{color: '#0093AB'}} />
                                            <span>Project Board</span>
                                        </Link>
                                        <Link
                                            to={`/project/update/${project.id}`}
                                            onClick={() => getProjects(project.id, project.identifier)}
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