const TaskContainer = ({tasks, toggleTaskUpdate, deleteAction}) => {

    return (
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
                                        <li onClick={() => deleteAction(task.taskID)}>Delete</li>
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
                                        <li onClick={() => deleteAction(task.taskID)}>Delete</li>
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
                                        <li onClick={() => deleteAction(task.taskID)}>Delete</li>
                                    </div>
                                </div>
                            </div>
                        ) : ''
                    })
                }
            </div>
        </div>
    )
}

export default TaskContainer