import DatePicker from "react-datepicker";
import {useSelector} from "react-redux";
import {useState} from "react";

const Form = ({isNewProject, title, submitBtnText, submit, change, projectDate}) => {
    const error = useSelector((state) => state.project.error);
    const [selectedDate, setSelectedDate] = useState({
        startDate: '',
        endDate: null
    })

    const setDate = (name, value) => {
        projectDate(name, value)
        setSelectedDate({
            ...selectedDate,
            [name]: value
        })
    }

    const onChange = event => {
        change(event)
    }
    const onSubmit = event => {
        event.preventDefault();
        submit(event)
    }

    return (
        <form className="projectForm"
              onSubmit={onSubmit}
        >
            <div className="titleContainer">
                <h2>{title}</h2>
            </div>
            <div className="formContainer">
                {
                    isNewProject ? (
                        <div className="formGroup">
                            <input type="text"
                                   name={"identifier"}
                                   className={error ? 'addRedBorder' : 'identifier'}
                                   onChange={onChange}
                                   placeholder={'Enter form identifier'}
                            />
                            {error && error.identifier && (<p className='inputError'>{error.identifier}</p>)}
                        </div>
                    ): ''
                }
                <div className="formGroup">
                    <input type="text"
                           name={"name"}
                           className={error ? 'addRedBorder' : 'name'}
                           onChange={onChange}
                           placeholder={'Enter project Name'}
                    />
                    {error && error.name && (<p className='inputError'>{error.name}</p>)}
                </div>
                <div className="formGroup">
                            <textarea
                                name={"description"}
                                className={error ? 'addRedBorder' : 'description'}
                                onChange={onChange}
                                placeholder={'Enter project Description'}/>
                    {error && error.description &&
                    (<p className='inputError'>{error.description}</p>)}
                </div>
                <div className="formGroup">
                    <DatePicker
                        name={"startDate"}
                        className={error ? 'addRedBorder' : 'startDate'}
                        selected={selectedDate.startDate}
                        minDate={new Date()}
                        dateFormat={"yyyy-MM-dd"}
                        onChange={(date) => setDate("startDate", date)}
                        placeholderText="Select project start date"
                    />
                    {error && error.startDate && (<p className='inputError'>{error.startDate}</p>)}
                </div>
                <div className="formGroup">
                    <DatePicker
                        name={"endDate"}
                        className={error ? 'addRedBorder' : 'endDate'}
                        selected={selectedDate.endDate}
                        minDate={selectedDate.startDate}
                        dateFormat={"yyyy-MM-dd"}
                        onChange={(date) => setDate("endDate", date)}
                        placeholderText="Select project end date"
                    />
                    {error && error.endDate && (<p className='inputError'>{error.endDate}</p>)}
                </div>

                <div className="formGroup">
                    <div className="btnContainer">
                        <input type="submit" className="submitButton" value={submitBtnText}/>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Form