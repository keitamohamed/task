import {useContext, useEffect, useState} from "react";
// @ts-ignore
import DatePicker from 'react-datepicker'
import { useModel } from "../../hook/useModel";
import {useAppSelector} from "../../setup/store/ReduxHook";
import {FaTimes} from "react-icons/all";
import {UIContent} from "../../setup/context/Context";

export const Model = () => {
    const uiCtx = useContext(UIContent)
    const {modelProps, toggle, onChange, onChangeDate, onSubmit} = useModel();
    const {task, message, error} = useAppSelector((state) => state.task)
    const [taskDate, setTaskDate] = useState<{date: Date}>({
        date: new Date()
    })

    useEffect(() => {

    }, [modelProps])

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
                            <FaTimes onClick={toggle} />
                        </div>
                        <div className="titleContainer">
                            <h2>{uiCtx.getModelProperty().isNewTask ? 'New Project Task' : 'Update Project Task'}</h2>
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
                                selected={task.dueDate}
                                minDate={new Date()}
                                dateFormat={"yyyy-MM-dd"}
                                onChange={(date: Date) => onChangeDate("dueDate", date)}
                                placeholderText={task.dueDate ? task.dueDate : 'Select task due date'}
                            />
                            {error && error.dueDate && (<p className='inputError'>{error.dueDate}</p>)}
                        </div>
                        <div className="formGroup messageContainer">
                            {message && message.message && (<p className='message'>{message.message}</p>)}
                        </div>
                        <div className="formGroup">
                            <div className="btnContainer">
                                <input type="submit" className="submitButton" value={modelProps.isNewTask ? 'Submit' : 'Update'}/>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}