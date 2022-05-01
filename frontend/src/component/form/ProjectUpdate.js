import {useContext, useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {projectAction} from "../../store/project_slice";

import {GET_REQUEST, SEND_REQUEST} from "../../action/request";
import Header from "../page/Header";

import Notification from "../../notification/Notification";
import {NotificationContext} from "../context/Context";
import Form from "./Form";

let isLoaded = false
let showNotification = false;

const ProjectUpdate = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {project: selectedProject, message} = useSelector((state) => state.project);
    const [updateProject, setUpdateProject] = useState({})
    const {setActionMessage, hideNotificationWithTimeout, notification} = useContext(NotificationContext)


    const setDate = (name, value) => {
        setUpdateProject({
            ...updateProject,
            [name]: value,
        })
    }

    const onChange = event => {
        setUpdateProject({
            ...updateProject,
            [event.target.name]: event.target.value
        })
        dispatch(projectAction.updateProject({name: event.target.name, value: event.target.value}))
    }

    const setProjects = (url, id, data) => {
      dispatch(projectAction.loadProject(data))
    }

    const setError = (error) => {
      dispatch(projectAction.setError(error))
    }
    
    const projectUpdateAction = (data) => {
        dispatch(projectAction.setMessage(data))
        dispatch(GET_REQUEST('project/find-all-project', null, null, setProjects, setError))
    }

    const onSubmit = event => {
        event.preventDefault();
        dispatch(SEND_REQUEST('PUT', `project/update/${selectedProject.id}`, selectedProject, projectUpdateAction, setError))
        showNotification = true;
    }

    const setMessage = () => {
        setActionMessage(message)
        hideNotificationWithTimeout(5000)
    }

    const setNotification = () => {
        showNotification = false
    }

    const projectPage = () => {
        navigate("/project")
    }

    useEffect(() => {
        if (!isLoaded) {
            setUpdateProject(selectedProject)
            isLoaded = true
        }
        if (message !== null && showNotification) {
            setMessage()
            setTimeout(setNotification, 5000)
            setTimeout(projectPage, 5000)
        }
    }, [selectedProject, message, updateProject, notification])

    return (
        <div className="projectUpdate">
            <Header/>
            <div className="mainContainer">
                <Notification/>
                <Form
                    isNewProject={false}
                    title={'Update Project Form'}
                    submitBtnText={'Update Project'}
                    change={onChange}
                    projectDate={setDate}
                    submit={onSubmit}
                />
            </div>
        </div>
    )
}

export default ProjectUpdate