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

    const setProductTask = (url, id, response) => {
        dispatch(taskAction.loadTask(response))
    }

    const setError = (error) => {
        dispatch(taskAction.setError(error.response.data))
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
        dispatch(GET_REQUEST(`project/project-task/${project.identifier}`, project.identifier, accessToken, setProductTask, setError))
    }

    const deleteAction = (taskID) => {
        dispatch(DELETE_REQUEST('product/delete-task/', taskID, null, reLoadTasks))
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
        const size = {
            width: window.innerWidth || document.body.clientWidth,
            height: window.innerHeight || document.body.clientHeight
        }

        console.log("Size", size)

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