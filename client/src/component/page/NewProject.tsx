import {Form} from "../form/Form";
import {useAppDispatch, useAppSelector} from "../../setup/store/ReduxHook";
import {projectAction} from "../../setup/slice/project";

export const NewProject = () => {

    const dispatch = useAppDispatch()
    
    const onChange = (event: any): void => {
        dispatch(projectAction.addNewProject(event.target))
    }

    const onSubmit = (): void => {
    }

    return (
        <div className={'projectForm'}>
            <div className="mainContainer">
                <Form isNew={true} title={'New Project'} btnText={'Submit'} onChange={onChange} onSubmit={onSubmit} />
            </div>
        </div>
    )
}