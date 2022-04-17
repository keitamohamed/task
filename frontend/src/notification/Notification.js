import {useContext, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {DELETE_REQUEST} from "../action/request";

import {NotificationContext} from "../component/context/Context";

const Notification = () => {
    const dispatch = useDispatch()
    const {project} = useSelector((state) => state.project)
    const {notification, hideNotification, setActionMessage} = useContext(NotificationContext)

    const action = event => {
        if (event.target.name === 'cancel') {
            hideNotification()
            return
        }
        dispatch(DELETE_REQUEST('project/delete-project/', notification.identifier, null))
        hideNotification()
        setActionMessage(project)
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