import {useAppDispatch, useAppSelector} from "../setup/store/ReduxHook"
import {ChangeEvent, ChangeEventHandler, useContext, useState} from "react";
import {taskAction} from "../setup/slice/task";
import {useProject} from "./useProject";
import {UIContent} from "../setup/context/Context";

interface ModelProp {
    task: any,
    date: Date,
    isNewTasks: boolean,
    change: () => void,

}

export const useModel = () => {
    const dispatch = useAppDispatch()
    const {findProjectByIdentifier, setProjectTasks} = useProject()
    const {task} = useAppSelector((state) => state.task)
    const {project} = useAppSelector((state) => state.project)
    const uiCtx = useContext(UIContent)
    const [modelProps, setModelProps] = useState<{isNewTask: boolean}>({
        isNewTask: false,
    });

    const setProps = (isNewTask: boolean) => {
        uiCtx.setModelProp(isNewTask)
    }

    const onChange = (event: any) => {
        dispatch(taskAction.newTask(event))
    }

    const onChangeDate = (name: string, date: Date) => {
        dispatch(taskAction.setTaskDue({name, date}))
    }

    const setNewProject = (isNewTask: boolean) => {
        console.log("isNewTask", isNewTask)
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
    }

    return {modelProps, toggle, setNewProject, setProps, onChange, onChangeDate, onSubmit}
}