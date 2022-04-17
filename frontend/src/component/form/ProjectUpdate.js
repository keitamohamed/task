import Form from "./Form";
import {useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {projectAction} from "../../store/project_slice";
import {UPDATE_REQUEST} from "../../action/request";

import Header from "../page/Header";
import Notification from "../../notification/Notification";
import {NotificationContext} from "../context/Context";

let isLoaded = false
let showNotification = false;

const ProjectUpdate = () => {
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

    const onSubmit = event => {
        event.preventDefault();
        dispatch(UPDATE_REQUEST(`project/update/${selectedProject.id}`, selectedProject))
        showNotification = true;
    }

    const setMessage = () => {
        setActionMessage(message)
        hideNotificationWithTimeout(5000)
    }

    const setNotification = () => {
        showNotification = false
    }

    useEffect(() => {
        if (!isLoaded) {
            setUpdateProject(selectedProject)
            isLoaded = true
        }
        if (message !== null && showNotification) {
            setMessage()
            setTimeout(setNotification, 5000)

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