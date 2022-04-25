import DatePicker from "react-datepicker";
import {useState} from "react";
import {FaTimes} from "react-icons/fa";

const TaskModel = () => {
    const [task, setTask] = useState({})

    const setDate = (name, value) => {
        setTask({
            ...task,
            [name]: value
        })
    }

    const toggleModel = () => {
        const getElement = document.querySelector('.model');
        getElement.classList.toggle('open_model')
    }

    return (
        <div className="model">
            <div className="content">
                <form action="" className="form">
                    <div className="formContainer">
                        <div className="btnCloseContainer">
                            <FaTimes onClick={toggleModel} />
                        </div>
                        <div className="titleContainer">
                            <h2>New Project Task</h2>
                        </div>
                        <div className="formGroup">
                            <textarea
                                   name={"name"}
                                   className={'addRedBorder summary'}
                                   onChange={''}
                                   placeholder={'Enter task summary'}
                            />
                        </div>
                        <div className="formGroup">
                            <select id = "priority" className={'addRedBorder priority'}>
                                <option value="default">Select task priority</option>
                                <option value="High">Height</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                        <div className="formGroup">
                            <select id = "status" className={'addRedBorder status'}>
                                <option value="default">Select task status</option>
                                <option value="To Do">To Do</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Complete">Complete</option>
                            </select>

                        </div>
                        <div className="formGroup">
                            <DatePicker
                                name={"dueDate"}
                                className={'addRedBorder dueDate'}
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