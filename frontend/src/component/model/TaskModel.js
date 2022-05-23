import {useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import DatePicker from "react-datepicker";
import {FaTimes} from "react-icons/fa";
import {GET_REQUEST, SEND_REQUEST} from "../../action/request";
import {taskAction} from "../../store/task_slice";
import {AuthContext} from "../context/Context";

const TaskModel = ({isNewTask, task, change, taskDate}) => {
    const dispatch = useDispatch()
    const authCtx = useContext(AuthContext)
    const {message} = useSelector((state) => state.task)
    const {project} = useSelector((state) => state.project)
    const {error} = useSelector((state) => state.task)
    const [selectedDate, setSelectedDate] = useState({
        dueDate: ''
    })


    const onChange = event => {
        change(event)
    }

    const setDate = (name, value) => {
        setSelectedDate({
            ...selectedDate,
            [name]: value
        })
        taskDate(name, value)
    }

    const setProductTask = (ur, id, data) => {
        dispatch(taskAction.loadTask(data))
    }

    const setError = (error) => {
        dispatch(taskAction.setError(error.response.data))
    }

    const toggleModel = () => {
        const getElement = document.querySelector('.model');
        getElement.classList.toggle('open_model')
        dispatch(taskAction.reSetMessage({}))
        dispatch(taskAction.reSetError({}))
    }
    
    const updateAction = (data) => {
        dispatch(taskAction.setMessage(data))
        getProjectTask()
    }

    const getProjectTask = (message) => {
        dispatch(taskAction.setMessage(message))
        const {accessToken} = authCtx.cookie
        dispatch(GET_REQUEST(`project/project-task/${project.identifier}`, project.identifier, setProductTask, setError, accessToken))
    }
    
    const onSubmit = event => {
        event.preventDefault()
        const {accessToken} = authCtx.cookie
        if (isNewTask) {
            dispatch(SEND_REQUEST('POST', `project/${project.identifier}/add-task`, task, getProjectTask, setError, accessToken))
            return
        }
        dispatch(SEND_REQUEST('PUT', `project/update-task/${task.taskID}`, task, updateAction, setError, accessToken))
    }

    useEffect(() => {
    }, [task])

    return (
        <div className="model">
            <div className="content">
                <form
                    action=""
                    className="form"
                    onSubmit={onSubmit}
                >
                    <div className="formContainer">
                        <div className="btnCloseContainer">
                            <FaTimes onClick={toggleModel} />
                        </div>
                        <div className="titleContainer">
                            <h2>{isNewTask ? 'New Project Task' : 'Update Project Task'}</h2>
                        </div>
                        <div className="formGroup">
                            <textarea
                                   name='summary'
                                   className={error && error.summary ? 'addRedBorder' : 'summary'}
                                   onChange={onChange}
                                   value={task.summary}
                                   placeholder={task.summary ? task.summary : 'Enter task summary'}
                            />
                            {error && error.summary && (<p className='inputError'>{error.summary}</p>)}
                        </div>
                        <div className="formGroup">
                            <select
                                id = "priority"
                                name='priority'
                                className={error && error.priority ? 'addRedBorder' : 'priority'}
                                value={task.priority ? task.priority : ''}
                                onChange={onChange}
                            >
                                <option value="default">
                                    Select task priority
                                </option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                            {error && error.priority && (<p className='inputError'>{error.priority}</p>)}
                        </div>
                        <div className="formGroup">
                            <select
                                id = "status"
                                name='status'
                                value={task.status ? task.status : ''}
                                className={error && error.status ? 'addRedBorder' : 'status'}
                                onChange={onChange}
                            >
                                <option value="default">Select task status</option>
                                <option value="To Do">To Do</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Complete">Complete</option>
                            </select>
                            {error && error.status && (<p className='inputError'>{error.status}</p>)}
                        </div>
                        <div className="formGroup">
                            <DatePicker
                                name={"dueDate"}
                                className={error && error.dueDate ? 'addRedBorder' :'dueDate'}
                                selected={selectedDate.dueDate}
                                minDate={new Date()}
                                dateFormat={"yyyy-MM-dd"}
                                onChange={(date) => setDate("dueDate", date)}
                                placeholderText={task.dueDate ? task.dueDate : 'Select task due date'}
                            />
                            {error && error.dueDate && (<p className='inputError'>{error.dueDate}</p>)}
                        </div>
                        <div className="formGroup messageContainer">
                            {message && message.message && (<p className='message'>{message.message}</p>)}
                        </div>
                        <div className="formGroup">
                            <div className="btnContainer">
                                <input type="submit" className="submitButton" value={isNewTask ? 'Submit' : 'Update'}/>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TaskModel