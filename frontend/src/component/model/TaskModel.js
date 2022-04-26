import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import DatePicker from "react-datepicker";
import {FaTimes} from "react-icons/fa";
import {GET_REQUEST, SEND_REQUEST} from "../../action/request";
import {taskAction} from "../../store/task_slice";

const TaskModel = () => {
    const dispatch = useDispatch()
    const {project} = useSelector((state) => state.project)
    const {error} = useSelector((state) => state.task)
    const [task, setTask] = useState({})

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

    const toggleModel = () => {
        dispatch(GET_REQUEST('project/project-task/', project.identifier, null, setProductTask, setErrorMessage))
        const getElement = document.querySelector('.model');
        getElement.classList.toggle('open_model')
    }

    const setProductTask = (url, id, response) => {
        dispatch(taskAction.loadTask(response))
    }
    const setErrorMessage = (error) => {
        dispatch(taskAction.setError(error.response.data))
    }
    
    const addNewTask = event => {
        event.preventDefault()
        dispatch(SEND_REQUEST('POST', `project/${project.identifier}/add-task`, task, null))
    }

    return (
        <div className="model">
            <div className="content">
                <form
                    action=""
                    className="form"
                    onSubmit={addNewTask}
                >
                    <div className="formContainer">
                        <div className="btnCloseContainer">
                            <FaTimes onClick={toggleModel} />
                        </div>
                        <div className="titleContainer">
                            <h2>New Project Task</h2>
                        </div>
                        <div className="formGroup">
                            <textarea
                                   name='summary'
                                   className={error && error.summary ? 'addRedBorder' : 'summary'}
                                   onChange={onChange}
                                   placeholder={'Enter task summary'}
                            />
                        </div>
                        <div className="formGroup">
                            <select
                                id = "priority"
                                name='priority'
                                className={error && error.priority ? 'addRedBorder' : 'priority'}
                                onChange={onChange}
                            >
                                <option value="default">Select task priority</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                        <div className="formGroup">
                            <select
                                id = "status"
                                name='status'
                                className={error && error.status ? 'addRedBorder' : 'status'}
                                onChange={onChange}
                            >
                                <option value="default">Select task status</option>
                                <option value="To Do">To Do</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Complete">Complete</option>
                            </select>

                        </div>
                        <div className="formGroup">
                            <DatePicker
                                name={"dueDate"}
                                className={error && error.dueDate ? 'addRedBorder' :'dueDate'}
                                selected={task.dueDate}
                                minDate={new Date()}
                                dateFormat={"yyyy-MM-dd"}
                                onChange={(date) => setDate("dueDate", date)}
                                placeholderText="Select task due date"
                            />
                        </div>
                        <div className="formGroup">
                            <div className="btnContainer">
                                <input type="submit" className="submitButton" value={"Submit"}/>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TaskModel