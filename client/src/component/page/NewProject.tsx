import {useNavigate} from 'react-router-dom'
import {Form} from "../form/Form";
import {useAppDispatch} from "../../setup/store/ReduxHook";
import {projectAction} from "../../setup/slice/project";
import {useProject} from "../../hook/useProject";
import Header from "./Header";

export const NewProject = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {addNewProject, loadProjects} = useProject()
    
    const onChange = (event: any): void => {
        dispatch(projectAction.addNewProject(event.target))
    }

    const navigateTo = () => {
        navigate('/task')
    }

    const onSubmit = async (event: any) => {
        event.preventDefault()
        await addNewProject()
        await loadProjects()
        setTimeout(navigateTo, 5000)
    }

    return (
        <>
            <Header width={undefined} color={undefined}  />
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
        </>
    )
}