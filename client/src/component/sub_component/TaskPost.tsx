import {useAppSelector} from "../../setup/store/ReduxHook";
import {useTask} from "../../hook/useTask";
import {useModel} from "../../hook/useModel";

export const TaskPost = () => {
    const {deleteTask} = useTask()
    const {setProps} = useModel()
    const {tasks} = useAppSelector((state) => state.task)

    return (
        <>
            <div className="position_left custom_g_style md:border-y-1 md:mt-2 md:mb-2 lg:border-r border-borderColor">
                <div className="title_container md:!text-left bg-cyan-300 text-white">
                    <h5 className={`md:!texts-left`}>To Do</h5>
                </div>
                <div className={`task_container grid md:grid-cols-2`}>
                    {
                        tasks.map((task, index) => {
                            return task.status === 'To Do' ? (
                                <div className="task p-1" key={`${task.id}_${index}`}>
                                    <div className="task_header grid grid-cols-2">
                                        <li className={`text-left pl-3`}>{`ID#: ${task.taskID}`}</li>
                                        <li>{`Priority: ${task.priority}`}</li>
                                    </div>
                                    <div className="task_body">
                                        <p>{`${task.summary}`}</p>
                                        <div className="actionBtn grid grid-cols-2 gap-1 mt-3">
                                            <li className={`border bg-teal-400 text-slate-50`}
                                                onClick={() => setProps(false)}>Update</li>
                                            <li className={`border bg-red-700 text-slate-50`} onClick={() => deleteTask(task.id)}>Delete</li>
                                        </div>
                                    </div>
                                </div>
                            ) : ''
                        })
                    }
                </div>
            </div>
            <div className="position_middle custom_g_style md:border-y-1 md:mt-4 md:mb-2 sm:mt-2 lg:border-r border-borderColor">
                <div className="title_container bg-teal-400">
                    <h5>In Progress</h5>
                </div>
                <div className="task_container grid md:grid-cols-2">
                    {
                        tasks.map((task, index) => {
                            return task.status === 'In Progress' ? (
                                <div className="task p-1" key={`${task.id}_${index}`}>
                                    <div className="task_header grid grid-cols-2">
                                        <li>{`ID#: ${task.taskID}`}</li>
                                        <li>{`Priority: ${task.priority}`}</li>
                                    </div>
                                    <div className="task_body">
                                        <p>{`${task.summary}`}</p>
                                        <div className="actionBtn grid grid-cols-2 gap-1 mt-3">
                                            <li
                                                className={`border bg-teal-400 text-slate-50`}
                                                onClick={() => setProps(false)}>Update</li>
                                            <li className={`border bg-red-700 text-slate-50`} onClick={() => deleteTask(task.id)}>Delete</li>
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
                <div className="task_container grid md:grid-cols-2">
                    {
                        tasks.map((task, index) => {
                            return task.status === 'Complete' ? (
                                <div className="task p-1" key={`${task.id}_${index}`}>
                                    <div className="task_header grid grid-cols-2">
                                        <li className={`text-left pl-3`}>{`ID#: ${task.taskID}`}</li>
                                        <li>{`Priority: ${task.priority}`}</li>
                                    </div>
                                    <div className="task_body">
                                        <p>{`${task.summary}`}</p>
                                        <div className="actionBtn grid grid-cols-2 gap-1 mt-3">
                                            <li
                                                className={`border bg-teal-400 text-slate-50`}
                                                onClick={() => setProps(false)}
                                            >Update</li>
                                            <li className={`border bg-red-700 text-slate-50`}
                                                onClick={() => deleteTask(task.id)}>
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
        </>
    )
}