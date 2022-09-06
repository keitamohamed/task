import {useContext, useEffect} from "react";
import {NotificationContext, UIContent} from "../../setup/context/Context";

import {BsPlusSquareDotted} from "react-icons/bs";

import Header from "./Header";
import {TaskPostContainer} from "../sub_component/TaskPostContainer";
import {useModel} from "../../hook/useModel";
import {Model} from "../model/Model";
import {useAppSelector} from "../../setup/store/ReduxHook";
import {Notification} from "../../notification/Notification";
import {useTask} from "../../hook/useTask";
import {useNotification} from "../../hook/useNotification";

export const Task = () => {
    const uiCtx = useContext(UIContent)
    const {tasks} = useAppSelector((state) => state.task)
    const {notificationAction} = useNotification()
    const {getNotificationsProperty, cancelRequest, hideNotificationTimeout} = useContext(NotificationContext)
    const {setNewProject} = useModel()
    const {deleteTask} = useTask()

    const conformDelete = async () => {
        await deleteTask()
        hideNotificationTimeout(5000)
    }

    useEffect(() => {
        notificationAction()
    }, [getNotificationsProperty()])

    return (
        <div className='projectBoard'>
            <Header
                width={uiCtx.getLogoProperties().width}
                color={uiCtx.getLogoProperties().color}
            />
            <Notification
                conform={conformDelete}
                closeNotification={cancelRequest}
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