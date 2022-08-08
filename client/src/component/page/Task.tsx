import {useContext, useEffect} from "react";
import {UIContent} from "../../setup/context/Context";

import {BsPlusSquareDotted} from "react-icons/bs";

import Header from "./Header";
import {TaskPostContainer} from "../sub_component/TaskPostContainer";
import {useModel} from "../../hook/useModel";
import {Model} from "../model/Model";
import {useAppSelector} from "../../setup/store/ReduxHook";
import {Notification} from "../../notification/Notification";
import {useTask} from "../../hook/useTask";

let notificationElement: HTMLElement | null

export const Task = () => {
    const uiCtx = useContext(UIContent)
    const {tasks, task} = useAppSelector((state) => state.task)
    const {setNewProject} = useModel()
    const {deleteTask} = useTask()

    const conformDelete = () => {
        deleteTask()
        setTimeout(closeNotificationDialog, 5000)
    }

    const closeNotificationDialog = () => {
        notificationElement?.setAttribute('closing', '')
        notificationElement?.addEventListener('animationend', () => {
            notificationElement?.setAttribute('closed', '')
            notificationElement?.removeAttribute('closing')
            notificationElement?.removeAttribute('open')
        }, {once: true})
    }

    useEffect(() => {
        if (notificationElement === undefined || notificationElement === null) {
            notificationElement = document.querySelector('.notification')
        }
    }, [])

    return (
        <div className='projectBoard'>
            <Header
                width={uiCtx.getLogoProperties().width}
                color={uiCtx.getLogoProperties().color}
            />
            <Notification
                conform={conformDelete}
                closeNotification={closeNotificationDialog}
            />
            <Model/>
            <div className="nav max-w-[80%] text-left mt-7 pl-5">
                <div className="navActionBtnContainer max-w-full text-left">
                    <li className={`bt_icon text-left list-none`}
                        onClick={() => setNewProject(true)}>
                        <BsPlusSquareDotted className={`rounded text-4xl pb-1`} />
                        <span className={`pt-2`}>Create Task</span>
                    </li>
                </div>
            </div>
            <div className={`tasks grid ${tasks.length > 0 ? ' mt-5' : ''}`}>
                <TaskPostContainer/>
            </div>
        </div>
    )
}