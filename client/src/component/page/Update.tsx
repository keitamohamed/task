import {Form} from "../form/Form";
import {useAppDispatch} from "../../setup/store/ReduxHook";
import {projectAction} from "../../setup/slice/project";
import {useProject} from "../../hook/useProject";

export const UpdateProject = () => {
    const dispatch = useAppDispatch()
    const {updateProject} = useProject()

    const onChange = (event: any) => {
        dispatch(projectAction.addNewProject(event.target))
    }

    const onSubmit = async (event: any) => {
        event.preventDefault();
        await updateProject()
    }

    return (
        <div className='projectUpdate'>
            <div className="mainContainer">
                <Form
                    isNew={false}
                    title={'Update Project'}
                    btnText={'Update'}
                    onChange={onChange}
                    onSubmit={onSubmit}
                />
            </div>
        </div>
    )
  
}