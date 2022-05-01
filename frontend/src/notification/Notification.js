import {useContext, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {DELETE_REQUEST, GET_REQUEST} from "../action/request";

import {NotificationContext} from "../component/context/Context";
import {taskAction} from "../store/task_slice";
import {projectAction} from "../store/project_slice";

const Notification = () => {
    const dispatch = useDispatch()
    const {message} = useSelector((state) => state.project)
    const {notification, hideNotification, setActionMessage} = useContext(NotificationContext)

    const setProjectErrorMessage = (data) => {
        dispatch(projectAction.setError(data))
    }

    const setProduct = (id, response) => {
        if (id !== null) {
            dispatch(projectAction.selectedProject(response))
        }
        else {
            dispatch(projectAction.loadProject(response))
        }
    }

    const setProjectAction = (message) => {
        dispatch(projectAction.setMessage(message))
        dispatch(GET_REQUEST('project/find-all-project', null, null, setProduct, setProjectErrorMessage))
    }

    const action = event => {
        if (event.target.name === 'cancel') {
            hideNotification()
            return
        }
        dispatch(DELETE_REQUEST('project/delete/', notification.identifier, null, setProjectAction, setProjectErrorMessage))
        hideNotification()
        setActionMessage(message)
        setTimeout(hideNotification, 5000)
    }

    useEffect(() => {
    }, [notification])
    return (
        <div className={`notification ${notification.showNotification ? 'showNotification' : ''}`}>
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