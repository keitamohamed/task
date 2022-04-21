import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RiAddFill} from "react-icons/ri";
import {BsPlusSquareDotted} from "react-icons/bs";

import TaskModel from "../model/TaskModel";
import Header from "./Header";



const ProjectBoard = () => {
    const [task, setTask] = useState({})
    
    
    const toggleModel = () => {
        const getElement = document.querySelector('.model');
        getElement.classList.toggle('open_model')
    }

    useEffect(() => {

    }, [])
    return (
        <div className="projectBoard">
            <Header/>
            <TaskModel/>
            <div className="mainContainer">
                <div className="btnContainer">
                    <li onClick={toggleModel}>
                        <BsPlusSquareDotted />
                        <br/>
                        <span>Create Task</span>
                    </li>
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