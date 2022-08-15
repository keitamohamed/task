import {useNavigate} from 'react-router-dom'
import {Form} from "../form/Form";
import {useAppDispatch} from "../../setup/store/ReduxHook";
import project, {projectAction} from "../../setup/slice/project";
import {useProject} from "../../hook/useProject";

export const NewProject = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {addNewProject, loadProjects} = useProject()
    
    const onChange = (event: any): void => {
        dispatch(projectAction.addNewProject(event.target))
    }

    const onSubmit = async (event: any) => {
        event.preventDefault()
        await addNewProject()
        loadProjects()
        navigate('/task')
    }

    return (
        <div className={'projectForm'}>
            <div className="mainContainer">
                <Form
                    isNew={true}
                    title={'New Project'}
                    btnText={'Submit'}
                    onChange={onChange}
                    onSubmit={onSubmit} />
            </div>
        </div>
    )
}