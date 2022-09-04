import {Form} from "../form/Form";
import {useAppDispatch} from "../../setup/store/ReduxHook";
import {projectAction} from "../../setup/slice/project";
import {useProject} from "../../hook/useProject";
import Header from "./Header";

export const NewProject = () => {
    const dispatch = useAppDispatch()
    const {addNewProject} = useProject()
    
    const onChange = (event: any): void => {
        dispatch(projectAction.addNewProject(event.target))
    }

    const onSubmit = async (event: any) => {
        event.preventDefault()
        await addNewProject()
    }

    return (
        <>
            <Header width={undefined} color={undefined}  />
        <div className={'projectForm'}>
            <div className="mainContainer sm:w-[96%] md:w-[70%] lg:w-[60%] xl:w-[60%]">
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