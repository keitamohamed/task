import {useContext} from "react";
import {NotificationContext} from "../../setup/context/Context";
import {useNotification} from "../../hook/useNotification";


export const Notification = () => {
    const {getNotificationsProperty, setNotificationProperty} = useContext(NotificationContext)
    const {conform, cancel} = useNotification()

    return (
        <div className='notification'>
            <div className="body">
                <div className="title_container">
                    <h5>{getNotificationsProperty().title}</h5>
                </div>
                <div className="messageContainer">
                    <p>{getNotificationsProperty().message}</p>
                </div>
            </div>
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