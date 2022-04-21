import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import {useEffect, useState} from "react";
import {projectAction} from "../../store/project_slice";
import {SEND_REQUEST} from "../../action/request";
import Form from "./Form";

let isLoaded = false;

const NewProject = () => {
    const navigate = useNavigate();
    const project = useSelector((state) => state.project);
    // const error = useSelector((state) => state.project.error);
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
    const onSubmit = event => {
        event.preventDefault();
        dispatch(SEND_REQUEST('POST', 'project/add', project.project, null))
        navigate('/project')
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