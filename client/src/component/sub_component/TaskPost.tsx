import {useAppSelector} from "../../setup/store/ReduxHook";
import {useTask} from "../../hook/useTask";

export const TaskPost = () => {
    const {deleteTask} = useTask()
    const {tasks} = useAppSelector((state) => state.task)

    return (
        <>
            <div className="position_left">
                <div className="title_container">
                    <h5>To Do</h5>
                </div>
                <div className="task_container">
                    {
                        tasks.map((task, index) => {
                            return task.status === 'To Do' ? (
                                <div className="task">
                                    <div className="task_header">
                                        <li>{`ID: ${task.taskID}`}</li>
                                        <li>{`Priority: ${task.priority}`}</li>
                                    </div>
                                    <div className="task_body">
                                        <h3>{task.summary}</h3>
                                        <div className="actionBtn">
                                            <li>Update</li>
                                            <li onClick={() => deleteTask(task.id)}>Delete</li>
                                        </div>
                                    </div>
                                </div>
                            ) : ''
                        })
                    }
                </div>
            </div>
            <div className="position_middle">
                <div className="title_container">
                    <h5>In Progress</h5>
                </div>
                <div className="task_container">
                    {
                        tasks.map((task, index) => {
                            return task.status === 'In Progress' ? (
                                <div className="task">
                                    <div className="task_header">
                                        <li>{`ID: ${task.taskID}`}</li>
                                        <li>{`Priority: ${task.priority}`}</li>
                                    </div>
                                    <div className="task_body">
                                        <h3>{task.summary}</h3>
                                        <div className="actionBtn">
                                            <li>Update</li>
                                            <li onClick={() => deleteTask(task.id)}>Delete</li>
                                        </div>
                                    </div>
                                </div>
                            ) : ''
                        })
                    }
                </div>
            </div>
            <div className="position_right">
                <div className="title_container">
                    <h5>Completed</h5>
                </div>
                <div className="task_container">
                    {
                        tasks.map((task, index) => {
                            return task.status === 'Complete' ? (
                                <div className="task">
                                    <div className="task_header">
                                        <li>{`ID: ${task.taskID}`}</li>
                                        <li>{`Priority: ${task.priority}`}</li>
                                    </div>
                                    <div className="task_body">
                                        <h3>{task.summary}</h3>
                                        <div className="actionBtn">
                                            <li>Update</li>
                                            <li onClick={() => deleteTask(task.id)}>Delete</li>
                                        </div>
                                    </div>
                                </div>
                            ) : ''
                        })
                    }
                </div>
            </div>
        </>
    )
}