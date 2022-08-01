import {useAppSelector} from "../../setup/store/ReduxHook";
import {TaskPost} from "./TaskPost";

export const TaskContainer = () => {
    const {tasks} = useAppSelector((state) => state.task)

    return (
        <>
            {
                tasks.length !== 0 ? (
                    <div className={`taskContainer`}>
                        <TaskPost/>
                    </div>
                ) : ''
            }
        </>
    )
}