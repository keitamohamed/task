import {useAppSelector} from "../../setup/store/ReduxHook";
import {TaskPost} from "./TaskPost";
import {useEffect} from "react";
import task from "../../setup/slice/task";

export const TaskPostContainer = () => {
    const {tasks} = useAppSelector((state) => state.task)

    useEffect(() => {

    }, [tasks])
    return (
        <>
            {
                tasks.length > 0 ? (
                    <div className={`taskContainer`}>
                        <TaskPost/>
                    </div>
                ) :
                    <div className={`No Data text-center mt-10`}>
                        <h1>No Task</h1>
                    </div>
            }
        </>
    )
}