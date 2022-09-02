import {useContext, useEffect} from "react";
import moment from 'moment'
import {useAppDispatch, useAppSelector} from "../../setup/store/ReduxHook";
import {useTask} from "../../hook/useTask";
import {useModel} from "../../hook/useModel";
import {taskAction} from "../../setup/slice/task";
import {NotificationContext} from "../../setup/context/Context";


let notificationElement: HTMLElement | null;

export const TaskPost = () => {
    const {setNotificationProperty} = useContext(NotificationContext)
    const dispatch = useAppDispatch()
    const {deleteTask} = useTask()
    const {tasks} = useAppSelector((state) => state.task)
    const {setNewProject} = useModel()

    const setSelectedTask = (taskID: string) => {
        const selectedTask = tasks.find(task => task.taskID === taskID)
        dispatch(taskAction.setSelectedTask(selectedTask))
        setNewProject(false)
    }

    const showNotificationDialog = (taskID: string) => {
        const selectedTask = tasks.find((task) => task.taskID === taskID)
        dispatch(taskAction.setSelectedTask(selectedTask))
        setNotificationProperty({
                title: 'Delete Task',
                message: `Are you sure you want to delete task with an id ${taskID}?`,
            identifier: taskID,
            showBtn: true,
            showNotification: true,
        })
        notificationElement?.removeAttribute('closed')
        notificationElement?.setAttribute('open', '')
    }

    useEffect(() => {
        if (notificationElement === null || notificationElement === undefined) {
            notificationElement = document.querySelector('.notification')
        }
    }, [])

    return (
        <div className={`tasksContainer grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1`}>
            <div className="position_left custom_g_style md:border-y-1 md:mt-2 md:mb-2 lg:border-r border-borderColor">
                <div className="title_container md:!text-left text-white">
                    <h5 className={`md:!texts-left`}>To Do</h5>
                </div>
                <div className={`task_container grid md:grid-cols-1 gap-2`}>
                    {
                        tasks.map((task, index) => {
                            return task.status === 'To Do' ? (
                                <div className="task p-1" key={`${task.taskID}_${index}`}>
                                    <div className="task_header grid grid-cols-2">
                                        <li className={`text-left pl-3`}>{`ID#: ${task.taskID}`}</li>
                                        <div className="grid md:grid-cols-1 gap-1 mb-2">
                                            <li>{`Priority: ${task.priority}`}</li>
                                            <li>{`Due: ${moment(task.dueDate).format('MMM DD YYYY')}`}</li>
                                        </div>
                                    </div>
                                    <div className="task_body">
                                        <p>{`${task.summary}`}</p>
                                        <div className="actionBtn grid grid-cols-2 gap-1 mt-3">
                                            <li className={`text-slate-50`}
                                                onClick={() => setSelectedTask(task.taskID)}>Update</li>
                                            <li className={`text-slate-50`} onClick={() => showNotificationDialog(task.taskID)}>Delete</li>
                                        </div>
                                    </div>
                                </div>
                            ) : ''
                        })
                    }
                </div>
            </div>
            <div className="position_middle custom_g_style md:border-y-1 md:mt-2 md:mb-2 sm:mt-2 lg:border-r border-borderColor">
                <div className="title_container bg-teal-400">
                    <h5>In Progress</h5>
                </div>
                <div className="task_container grid md:grid-cols-1 gap-2">
                    {
                        tasks.map((task, index) => {
                            return task.status === 'In Progress' ? (
                                <div className="task p-1" key={`${task.taskID}_${index}`}>
                                    <div className="task_header grid grid-cols-2">
                                        <li>{`ID#: ${task.taskID}`}</li>
                                        <div className="grid md:grid-cols-1 gap-1 mb-2">
                                            <li>{`Priority: ${task.priority}`}</li>
                                            <li>{`Due: ${moment(task.dueDate).format('MMM DD YYYY')}`}</li>
                                        </div>
                                    </div>
                                    <div className="task_body">
                                        <p>{`${task.summary}`}</p>
                                        <div className="actionBtn grid grid-cols-2 gap-1 mt-3">
                                            <li
                                                className={`border bg-teal-400 text-slate-50`}
                                                onClick={() => setSelectedTask(task.taskID)}>Update</li>
                                            <li className={`border bg-red-700 text-slate-50`} onClick={() => showNotificationDialog(task.taskID)}>Delete</li>
                                        </div>
                                    </div>
                                </div>
                            ) : ''
                        })
                    }
                </div>
            </div>
            <div className="position_right custom_g_style md:border-y-1 md:mt-2 md:mb-2 sm:mt-2 lg:border-r border-borderColor">
                <div className="title_container bg-green-500">
                    <h5>Completed</h5>
                </div>
                <div className="task_container grid md:grid-cols-1 gap-2">
                    {
                        tasks.map((task, index) => {
                            return task.status === 'Complete' ? (
                                <div className="task p-1" key={`${task.taskID}_${index}`}>
                                    <div className="task_header grid grid-cols-2">
                                        <li className={`text-left pl-3`}>{`ID#: ${task.taskID}`}</li>
                                        <div className="grid md:grid-cols-1 gap-1 mb-2">
                                            <li>{`Priority: ${task.priority}`}</li>
                                            <li>{`Due: ${moment(task.dueDate).format('MMM DD YYYY')}`}</li>
                                        </div>
                                    </div>
                                    <div className="task_body">
                                        <p>{`${task.summary}`}</p>
                                        <div className="actionBtn grid grid-cols-2 gap-1 mt-3">
                                            <li
                                                className={`border bg-teal-400 text-slate-50`}
                                                onClick={() => setSelectedTask(task.taskID)}
                                            >Update</li>
                                            <li className={`border bg-red-700 text-slate-50`}
                                                onClick={() => showNotificationDialog(task.taskID)}>
                                                Delete
                                            </li>
                                        </div>
                                    </div>
                                </div>
                            ) : ''
                        })
                    }
                </div>
            </div>
        </div>
    )
}