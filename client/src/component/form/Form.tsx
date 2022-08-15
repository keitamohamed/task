import {useContext, useState} from "react";
// @ts-ignore
import DatePicker from 'react-datepicker'
import {useAppSelector, useAppDispatch} from "../../setup/store/ReduxHook";
import {useProject} from "../../hook/useProject";
import {projectAction} from "../../setup/slice/project";

export const Form = (props: {
    isNew: boolean,
    title: string,
    btnText: string,
    onChange: (event: any) => void,
    onSubmit: (event: any) => void }) => {

    const dispatch = useAppDispatch()
    const {} = useProject()
    const {project, error} = useAppSelector((state) => state.project)
    const [projectData, setProjectDate] = useState<{startDate: Date, endDate: Date}>({startDate: new Date, endDate: new Date})


    const onChangeDate = (name: string, date: Date) => {
        setProjectDate({
            ...projectData,
            [name]: date
        })
        dispatch(projectAction.setDate({name, date}))
    }

    return (
        <form
            className='form'
            onSubmit={props.onSubmit}
        >
            <div className="titleContainer">
                <h2>{props.title}</h2>
            </div>

            <div className="formContainer">
                <div className="formGroup">
                    <input
                        type="text"
                        name={'identifier'}
                        disabled={!props.isNew}
                        className={error.identifier ? error.identifier : 'identifier'}
                        onChange={props.onChange}
                        placeholder={project.identifier ? project.identifier : 'Enter project identifier'}
                    />
                </div>
                <div className="formGroup">
                    <input
                        type="text"
                        name={'name'}
                        className={error.name ? error.name : 'name'}
                        onChange={props.onChange}
                        placeholder={project.name ? project.name : 'Enter project name'}
                    />
                </div>
                <div className="formGroup">
                    <input
                        type="text"
                        name={'description'}
                        className={error.description ? error.description : 'description'}
                        onChange={props.onChange}
                        placeholder={project.description ? project.description : 'Enter project description'}
                    />
                </div>
                <div className="formGroup">
                    <DatePicker
                        name={"startDate"}
                        className={error && error.startDate ? 'addRedBorder' :'startDate'}
                        selected={projectData.startDate}
                        minDate={new Date()}
                        dateFormat={"yyyy-MM-dd"}
                        onChange={(date: Date) => onChangeDate("startDate", date)}
                        placeholderText={project.startDate ? project.startDate : 'Select project start date'}
                    />
                    {error && error.startDate && (<p className='inputError'>{error.startDate}</p>)}
                </div>
                <div className="formGroup">
                    <DatePicker
                        name={"endDate"}
                        className={error && error.endDate ? 'addRedBorder' :'endDate'}
                        selected={projectData.endDate}
                        minDate={projectData.startDate}
                        dateFormat={"yyyy-MM-dd"}
                        onChange={(date: Date) => onChangeDate("endDate", date)}
                        placeholderText={project.endDate ? project.endDate : 'Select project end date'}
                    />
                    {error && error.endDate && (<p className='inputError'>{error.endDate}</p>)}
                </div>
                <div className="formGroup">
                    <div className="btnContainer">
                        <input type="submit" className="submitButton" value={props.btnText}/>
                    </div>
                </div>
            </div>

        </form>
    )
}