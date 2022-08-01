import {useContext, useEffect} from "react";
import {UIContent} from "../../setup/context/Context";

import Header from "./Header";
import {useAppSelector} from "../../setup/store/ReduxHook";
import {BsPlusSquareDotted} from "react-icons/bs";

export const Task = () => {
    const uiCtx = useContext(UIContent)
    const {tasks} = useAppSelector((state) => state.task)

    useEffect(() => {
    }, [])
    return (
        <div className='projectBoard'>
            <Header
                width={uiCtx.getLogoProperties().width}
                color={uiCtx.getLogoProperties().color}/>
            <div className="nav">
                <div className="navActionBtnContainer">
                    <li>
                        <BsPlusSquareDotted/>
                        <br/>
                        <span>Create Task</span>
                    </li>
                </div>
            </div>
            {/*<TaskPost/>*/}
        </div>
    )
}