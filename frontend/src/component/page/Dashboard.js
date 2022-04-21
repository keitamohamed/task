import {useEffect} from "react";
import {useNavigate, Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {BsPlus} from 'react-icons/bs'

import {GET_REQUEST} from "../../action/request";

const Dashboard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {taskDue} = useSelector((state) => state.task)

    useEffect(() => {
        dispatch((GET_REQUEST('/project/task-due-soon', null, null)))
        dispatch(GET_REQUEST('project/find-all-project', null, null))
    }, [dispatch])
    return (
        <div className={`dashboard`}>
            <div className="sidebar">
                <nav className="sidebarNav">
                    <ul>
                        <div className="contentTop">
                            <li>
                                <Link to={'/'}>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='/project'>
                                    Project</Link>
                            </li>
                            <li>Tasks</li>
                        </div>
                        <div className="contentBottom">
                            <li>Teams</li>
                            <li>Engineering</li>
                            <li>Marking</li>
                            <li>Sale</li>
                        </div>
                    </ul>
                </nav>
            </div>
            <div className="mainContent">
                <div className="taskDueContainer">
                    <div className="titleContainer">
                        <h5>Tasks Due Soon
                        </h5>
                        <i>See all my tasks</i>
                    </div>
                    <div className="taskContainer">
                        <div className="content">
                            <ul>
                                <li>Meet with Client</li>
                                <li>Create Project</li>
                                <li>Creat app</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="contentButtonContainer">
                    <li>
                        <BsPlus
                            style={{color: '#557B83'}}
                            onClick={() => navigate("/new-project")}
                        />
                        <br/>
                        <span>New Project</span>
                    </li>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;