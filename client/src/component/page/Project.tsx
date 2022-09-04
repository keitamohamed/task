import {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom"

import Header from "./Header";
import {NotificationContext, UIContent} from "../../setup/context/Context";
import {BsPlus} from "react-icons/bs";
import {useAppSelector, useAppDispatch} from "../../setup/store/ReduxHook";
import NoData from "../sub_component/NoDate";
import {ProjectPost} from "../sub_component/ProjectPost";
import {Notification} from "../../notification/Notification";
import {useProject} from "../../hook/useProject";
import project, {projectAction} from "../../setup/slice/project";

export const Project = () => {
    const dispatch = useAppDispatch()
    const uiCtx = useContext(UIContent)
    const {getNotificationsProperty, cancelRequest, hideNotificationTimeout} = useContext(NotificationContext)
    const nav = useNavigate()
    const {deleteProject} = useProject()
    const {projects} = useAppSelector((state) => state.project)

    const navigate = (to: string) => {
        dispatch(projectAction.initialProject())
        dispatch(projectAction.setMessage({}))
        nav(to)
    }

    const deleteSelectedProject = async () => {
        await deleteProject()
        hideNotificationTimeout(5000)
    }

    const closeNotificationDialog = (): void => {
        cancelRequest(false, false)
    }

    useEffect(() => {
        const notificationElement = document.querySelector('.notification')

        if (getNotificationsProperty().showNotification) {
            if (notificationElement) {
                notificationElement.removeAttribute('closed')
                notificationElement.removeAttribute('closing')
                notificationElement.setAttribute('open', '')
            }
        }
        if (!getNotificationsProperty().showNotification) {
            const notificationElement = document.querySelector('.notification')
            if (notificationElement && notificationElement.hasAttribute('open')) {
                if ( notificationElement) {
                    notificationElement?.setAttribute('closing', '')
                    notificationElement?.addEventListener('animationend', () => {
                        notificationElement?.setAttribute('closed', '')
                        notificationElement?.removeAttribute('closing')
                        notificationElement?.removeAttribute('open')
                    }, {once: true})
                }
            }
        }
    }, [getNotificationsProperty()])

    return (<div className='project'>
        <Header width={uiCtx.getLogoProperties()?.width} color={uiCtx.getLogoProperties()?.color}/>
        <Notification
            conform={deleteSelectedProject}
            closeNotification={closeNotificationDialog}
        />
        <div className="mainContainer">
            <div className="contentButtonContainerPlus">
                <li>
                    <BsPlus
                        style={{color: '#557B83'}}
                        onClick={() => navigate("/add")}
                    />
                    <br/>
                    <span className={`sm:hidden md:hidden`}>New Project</span>
                </li>
            </div>
            <div className={`projectsContainer min-h-full`}>
                {
                    projects?.length !== 0 ?
                        <ProjectPost numPostPerPage={2}/>
                        : <NoData message={`No projects to display`}/>
                }
            </div>
        </div>
    </div>)
}