import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RiAddFill} from "react-icons/ri";
import {BsPlusSquareDotted} from "react-icons/bs";

import TaskModel from "../model/TaskModel";
import Header from "./Header";
import {taskAction} from "../../store/task_slice";
import {GET_REQUEST} from "../../action/request";



const ProjectBoard = () => {
    const dispatch = useDispatch()
    const projectTask = useSelector((state) => state.task)
    const {tasks} = useSelector((state) => state.task)
    const [task, setTask] = useState({
        summary: '',
        status: '',
        priority: '',
        dueDate: null
    })
    
    
    const toggleModel = () => {
        const getElement = document.querySelector('.model');
        getElement.classList.toggle('open_model')
    }

    const loadTask = (url, id, response) => {
        dispatch(taskAction.loadTask(response))
    }

    const setError = (error) => {
        dispatch(taskAction.setError(error.response.data))
    }

    const toggleTaskUpdate = (id) => {
        const findTask = tasks.find(task => task.taskID === id)
        setTask(findTask)
        const getElement = document.querySelector('.model');
        getElement.classList.toggle('open_model')
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
            <TaskModel task={task} change={onChange} taskDate={setDate} />
            <div className="mainContainer">
                <div className="btnContainer">
                    <li onClick={toggleModel}>
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
                                                    <li>Delete</li>
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
                                                    <li>Delete</li>
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
                                    return task.status === 'Completed' ? (
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
                                                    <li>Delete</li>
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