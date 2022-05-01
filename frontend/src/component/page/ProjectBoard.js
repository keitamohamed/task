import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RiAddFill} from "react-icons/ri";
import {BsPlusSquareDotted} from "react-icons/bs";

import TaskModel from "../model/TaskModel";
import Header from "./Header";
import {taskAction} from "../../store/task_slice";
import {DELETE_REQUEST, GET_REQUEST} from "../../action/request";



const ProjectBoard = () => {
    const dispatch = useDispatch()
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

    const deleteAction = () => {
        dispatch(GET_REQUEST('project/project-task/', project.identifier, null, setProductTask, setError))
    }

    const deleteTask = (taskID) => {
        dispatch(DELETE_REQUEST('product/delete-task/', taskID, null, deleteAction))
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
            <Header/>
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
                <div className="taskContainer">
                    <nav>
                        <li>
                            <h2>To Do</h2>
                        </li>
                        <li>
                            <h2>In Progress</h2>
                        </li>
                        <li>
                            <h2>Completed</h2>
                        </li>
                    </nav>
                    <div className="task">
                        <div className="positionLeft">
                            {
                                tasks.map((task, index) => {
                                    return task.status === 'To DO' || task.status === 'To Do' ? (
                                        <div className="card" key={index}>
                                            <div className=
                                                     {`header 
                                                     ${task.priority === 'High' ? 
                                                         'bgRed' : task.priority === 
                                                         'Medium' ? 'bgWarm' : 'bgGreen'}`}
                                            >
                                                <li>ID: {task.taskID}</li>
                                                <li>Priority: {task.priority}</li>
                                            </div>
                                            <div className="body">
                                                <h3>{task.summary}</h3>
                                                <div className="actionBtn">
                                                    <li onClick={() => toggleTaskUpdate(task.taskID)}>View / Update</li>
                                                    <li onClick={() => deleteTask(task.taskID)}>Delete</li>
                                                </div>
                                            </div>
                                        </div>
                                    ) : ''
                                })
                            }
                        </div>
                        <div className="positionMiddle">
                            {
                                tasks.map((task, index) => {
                                    return task.status === 'In Progress' ? (
                                        <div className="card" key={index}>
                                            <div className={
                                                `header 
                                                     ${task.priority === 'High' ?
                                                    'bgRed' : task.priority ===
                                                    'Medium' ? 'bgWarm' : 'bgGreen'}`
                                            }>
                                                <li>ID: {task.taskID}</li>
                                                <li>Priority: {task.priority}</li>
                                            </div>
                                            <div className="body">
                                                <h3>{task.summary}</h3>
                                                <div className="actionBtn">
                                                    <li onClick={() => toggleTaskUpdate(task.taskID)}>View / Update</li>
                                                    <li onClick={() => deleteTask(task.taskID)}>Delete</li>
                                                </div>
                                            </div>
                                        </div>
                                    ) : ''
                                })
                            }
                        </div>
                        <div className="positionRight">
                            {
                                tasks.map((task, index) => {
                                    return task.status === 'Complete' ? (
                                        <div className="card" key={index}>
                                            <div className={
                                                `header 
                                                     ${task.priority === 'High' ?
                                                    'bgRed' : task.priority ===
                                                    'Medium' ? 'bgWarm' : 'bgGreen'}`
                                            }>
                                                <li>ID: {task.taskID}</li>
                                                <li>Priority: {task.priority}</li>
                                            </div>
                                            <div className="body">
                                                <h3>{task.summary}</h3>
                                                <div className="actionBtn">
                                                    <li onClick={() => toggleTaskUpdate(task.taskID)}>View / Update</li>
                                                    <li onClick={() => deleteTask(task.taskID)}>Delete</li>
                                                </div>
                                            </div>
                                        </div>
                                    ) : ''
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectBoard