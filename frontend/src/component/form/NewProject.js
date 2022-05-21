import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import {useContext, useEffect, useState} from "react";
import {projectAction} from "../../store/project_slice";
import {GET_REQUEST, SEND_REQUEST} from "../../action/request";
import Form from "./Form";
import {AuthContext} from "../context/Context";

let isLoaded = false;

const NewProject = () => {
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext)
    const project = useSelector((state) => state.project);
    const dispatch = useDispatch();


    const [projectDate, setProjectDate] = useState({
        startDate: '',
        endDate: null
    })

    const setDate = (name, value) => {
        dispatch(projectAction.setDate({name, value}))
        setProjectDate({
            ...projectDate,
            [name]: value,
        })
    }

    const onChange = event => {
        dispatch(projectAction.addNewProject(event.target))
    }

    const setProducts = (url, id, response) => {
        dispatch(projectAction.loadProject(response))
    }

    const setError = (error) => {
        dispatch(projectAction.setError(error.response.data))
    }

    const fetchProject = () => {
        const {userID, accessToken} = authCtx.cookie
        dispatch(GET_REQUEST(`user/${userID}/projects`, userID, accessToken, setProducts, setError))
        navigate('/project')
    }

    const onSubmit = event => {
        event.preventDefault();
        const {userID, accessToken} = authCtx.cookie
        dispatch(SEND_REQUEST('POST', `project/${userID}/add`, project.project, fetchProject, setError, accessToken))
    }

    useEffect(() => {
        dispatch(projectAction.initialProject({}))
    }, [isLoaded])


    return (
        <div className="projectForm">
            <div className="mainContainer">
                <Form
                    title="New Project From"
                    isNewProject={true}
                    change={onChange}
                    projectDate={setDate}
                    submitBtnText={'Submit'}
                    submit={onSubmit}
                />
            </div>
        </div>
    )
}

export default NewProject;