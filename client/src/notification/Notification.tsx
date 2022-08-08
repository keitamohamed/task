import {useContext} from "react";
import {NotificationContext} from "../setup/context/Context";


export const Notification = (props: {conform: () => void, closeNotification: () => void}) => {
    const {getNotificationsProperty} = useContext(NotificationContext)

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
                            onClick={() => props.closeNotification()}>Cancel
                        </button>
                        <button
                            name={'conform'}
                            className={'conform'}
                            onClick={() => props.conform()}>Conform
                        </button>
                    </div>
                ) : ''
            }
        </div>
    )
}