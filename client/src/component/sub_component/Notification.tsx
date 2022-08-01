import {useContext} from "react";
import {NotificationContext} from "../../setup/context/Context";
import {useNotification} from "../../hook/useNotification";


export const Notification = () => {
    const {getNotificationsProperty, setNotificationProperty} = useContext(NotificationContext)
    const {conform, cancel} = useNotification()

    return (
        <div className='notification'>
            <p>{getNotificationsProperty().message}</p>
            {
                getNotificationsProperty().showBtn ? (
                    <div className="buttonContainer">
                        <button
                            name={'cancel'}
                            className={'cancel'}
                            onClick={cancel}>Cancel
                        </button>
                        <button
                            name={'conform'}
                            className={'conform'}
                            onClick={conform}>Conform
                        </button>
                    </div>
                ) : ''
            }
        </div>
    )
}