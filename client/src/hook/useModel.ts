import {useAppDispatch, useAppSelector} from "../setup/store/ReduxHook"
import {ChangeEvent, ChangeEventHandler, useContext, useState} from "react";
import {taskAction} from "../setup/slice/task";
import {useProject} from "./useProject";
import {UIContent} from "../setup/context/Context";
import {useTask} from "./useTask";

interface ModelProp {
    task: any,
    date: Date,
    isNewTasks: boolean,
    change: () => void,
}

export const useModel = () => {
    const dispatch = useAppDispatch()
    const uiCtx = useContext(UIContent)
    const {addTask, updateProject} = useTask()
    const {findProjectByIdentifier, setProjectTasks} = useProject()
    const {task} = useAppSelector((state) => state.task)
    const {project} = useAppSelector((state) => state.project)
    const [dueDate, setDueDate] = useState<{date: Date}>({
        date: new Date()
    })

    const setProps = (isNewTask: boolean) => {
        uiCtx.setModelProp(isNewTask)
    }

    const onChange = (event: any) => {
        dispatch(taskAction.newTask(event.target))
    }

    const onChangeDate = (name: string, date: Date) => {
        setDueDate({
            ...dueDate,
            date: date
        })
        dispatch(taskAction.setTaskDueDate({name, date}))
    }

    const setNewTask = (isNewTask: boolean) => {
        if (isNewTask) {
            dispatch(taskAction.initialTask())
        }
        setProps(isNewTask)
        toggle()
    }

    const updateAction = (message: object) => {
        dispatch(taskAction.setMessage(message))
        setProjectTasks(project.identifier)
    }

    const setError = (error: object) => {
        dispatch(taskAction.setError(error))
    }
    
    const toggle = () => {
        const element = document.querySelector('.model')
        element?.classList.toggle('open_model')
        dispatch(taskAction.reSetMessage())
        dispatch(taskAction.reSetError())
    }

    const onSubmit = (event: any) => {
        event.preventDefault()
        if (uiCtx.getModelProperty().isNewTask) {
            addTask()
        }else {
            updateProject()
        }
    }

    return {toggle, dueDate, setNewProject: setNewTask, setProps, onChange, onChangeDate, onSubmit}
}