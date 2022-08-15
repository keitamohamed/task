import {Form} from "../form/Form";

export const UpdateProject = () => {

    const onChange = (event: any) => {

    }

    const onSubmit = (event: any) => {

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