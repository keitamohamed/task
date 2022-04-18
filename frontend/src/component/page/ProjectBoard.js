import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import TaskModel from "../model/TaskModel";

import {RiAddFill} from "react-icons/ri";

import Header from "./Header";

const ProjectBoard = () => {
    const [task, setTask] = useState({})

    useEffect(() => {

    }, [])
    return (
        <div className="projectBoard">
            <Header/>
            <TaskModel/>
            <div className="mainContainer">
                <div className="btnContainer">
                    <li><RiAddFill /> <span>Create Task</span></li>
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
                        </div>
                        <div className="positionMiddle">

                        </div>
                        <div className="positionRight">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectBoard