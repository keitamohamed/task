import {useContext, useEffect} from "react";
import {UIContent} from "../../setup/context/Context";

import {BsPlusSquareDotted} from "react-icons/bs";

import Header from "./Header";
import {TaskPostContainer} from "../sub_component/TaskPostContainer";
import {useModel} from "../../hook/useModel";
import {Model} from "../model/Model";

export const Task = () => {
    const uiCtx = useContext(UIContent)
    const {setNewProject} = useModel()

    useEffect(() => {
    }, [])
    return (
        <div className='projectBoard'>
            <Header
                width={uiCtx.getLogoProperties().width}
                color={uiCtx.getLogoProperties().color}
            />
            <Model/>
            <div className="nav max-w-[70%] text-left mt-7 pl-5">
                <div className="navActionBtnContainer max-w-full text-left">
                    <li className={`max-w-full text-left list-none`}
                        onClick={() => setNewProject(true)}>
                        <BsPlusSquareDotted className={`rounded text-4xl pb-1`} />
                        <span className={`pt-2`}>Create Task</span>
                    </li>
                </div>
            </div>
            <div className="tasks grid grid-cols-3 md:grid-cols-1 sm:grid-cols-1 mt-5">
                <TaskPostContainer/>
            </div>
        </div>
    )
}