import {useContext, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {DELETE_REQUEST, GET_REQUEST} from "../action/request";

import {AuthContext, NotificationContext} from "../component/context/Context";
import {projectAction} from "../store/project_slice";


let messageNotification = null
const Notification = () => {
    const authCtx = useContext(AuthContext)
    const dispatch = useDispatch()
    const {message} = useSelector((state) => state.project)
    const {notification, setActionMessage} = useContext(NotificationContext)

    const setProjectErrorMessage = (data) => {
        dispatch(projectAction.setError(data))
    }

    const setProducts = (url, id, response) => {
        dispatch(projectAction.loadProject(response))
    }

    const setProjectAction = (message) => {
        const {userID, accessToken} = authCtx.cookie
        dispatch(projectAction.setMessage(message))
        setActionMessage(message)
        dispatch(GET_REQUEST(`user/${userID}/projects`, userID, accessToken, setProducts, setProjectErrorMessage))
    }

    const action = event => {
        const {accessToken} = authCtx.cookie
        if (event.target.name === 'cancel') {
            notificationAction()
            return
        }
        dispatch(DELETE_REQUEST('project/delete/', notification.identifier, accessToken, setProjectAction, setProjectErrorMessage))
        setActionMessage(message)
        setTimeout(notificationAction, 5000)
    }

    const notificationAction = () => {
        messageNotification.setAttribute('closing', '')
        messageNotification.addEventListener('animationend', () => {
            messageNotification.setAttribute('closed', '')
            messageNotification.removeAttribute('closing')
            messageNotification.removeAttribute('open')
        }, {once: true})
    }

    useEffect(() => {

        if (messageNotification === null) {
            messageNotification = document.querySelector(".notification")
        }
    }, [notification, messageNotification, message])
    return (
        <div className='notification'>
            <p>{notification.message}</p>
            {
                notification.showBtn ? (
                    <div className="buttonContainer">
                        <button
                            name={'cancel'}
                            className={'cancel'}
                            onClick={action}>Cancel
                        </button>
                        <button
                            name={'conform'}
                            className={'conform'}
                            onClick={action}>Conform
                        </button>
                    </div>
                ) : ''
            }
        </div>
    )
}

export default Notification