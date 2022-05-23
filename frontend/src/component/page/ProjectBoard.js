import {useState, useEffect, useContext} from "react";
import {useDispatch, useSelector} from "react-redux";
import {BsPlusSquareDotted} from "react-icons/bs";

import TaskModel from "../model/TaskModel";
import Header from "./Header";
import {taskAction} from "../../store/task_slice";
import {DELETE_REQUEST, GET_REQUEST} from "../../action/request";
import {AuthContext} from "../context/Context";
import TaskPost from "./sub-component/TaskPost";



const ProjectBoard = () => {
    const dispatch = useDispatch()
    const authCtx = useContext(AuthContext)
    const {project} = useSelector((state) => state.project)
    const projectTask = useSelector((state) => state.task)
    const {tasks} = useSelector((state) => state.task)
    const [task, setTask] = useState({
        summary: '',
        status: '',
        priority: '',
        dueDate: null
    })
    const [modelProperty, setModelProperty] = useState({
        isNewTask: Boolean,
    })

    const toggleModel = () => {
        const getElement = document.querySelector('.model');
        getElement.classList.toggle('open_model')
    }

    const newProject = () => {
        setTask({
            summary: '',
            status: '',
            priority: '',
            dueDate: null
        })
        setModelProperty({
            ...modelProperty,
            isNewTask: true
        })
        toggleModel();
    }

    const setProductTask = (response) => {
        dispatch(taskAction.loadTask(response))
    }

    const setError = (error) => {
        dispatch(taskAction.setError(error))
    }

    const toggleTaskUpdate = (id) => {
        const findTask = tasks.find(task => task.taskID === id)
        setTask(findTask)
        setModelProperty({
            ...modelProperty,
            isNewTask: false,
        })
        toggleModel()
    }

    const reLoadTasks = () => {
        const {accessToken} = authCtx.cookie
        dispatch(GET_REQUEST(`project/project-task/${project.identifier}`, setProductTask, setError, accessToken))
    }

    const deleteAction = (taskID) => {
        const {accessToken} = authCtx.cookie
        dispatch(DELETE_REQUEST('project/delete-task/', taskID, reLoadTasks, setError, accessToken))
    }

    const onChange = event => {
        setTask({
            ...task,
            [event.target.name]: event.target.value
        })
    }

    const setDate = (name, value) => {
        setTask({
            ...task,
            [name]: value
        })
    }

    useEffect(() => {

    }, [dispatch, tasks, projectTask])

    return (
        <div className="projectBoard">
            <Header width={'55%'}/>
            <TaskModel
                isNewTask={modelProperty.isNewTask}
                task={task}
                change={onChange}
                taskDate={setDate}
            />
            <div className="mainContainer">
                <div className="btnContainer">
                    <li onClick={newProject}>
                        <BsPlusSquareDotted />
                        <br/>
                        <span>Create Task</span>
                    </li>
                </div>
                <TaskPost
                    tasks={tasks}
                    toggleTaskUpdate={toggleTaskUpdate}
                    deleteAction={deleteAction}
                    numberOfPost={6}/>
            </div>
        </div>
    )
}

export default ProjectBoard