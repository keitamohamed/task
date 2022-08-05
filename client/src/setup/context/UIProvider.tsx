import {useState} from "react";

import {UIContent} from "./Context";
import {LogoProperty, Props} from "../../interface_type/interface"

const {Provider} = UIContent

const UIProvider = ({children}: Props) => {
    const [logoProperty, setLogoProperty] = useState<LogoProperty>({
        color: "",
        width: ""
    })
    const [modelProperty, setModelProperty] = useState<{isNewTask: boolean}>({
        isNewTask: false,
    })

    const getModelProperty = (): any => {
        return modelProperty
    }

    const getLogoProperties = (): any => {
      return logoProperty;
    }

    const setModelProp = (isNewTask: boolean) => {
        setModelProperty({
            isNewTask: isNewTask
        })
    }

    const setLogoProperties = (props: LogoProperty) => {
        setLogoProperty({
            ...logoProperty,
            width: props.width,
            color: props.color
        })
    }

    return (
        <Provider value={{
            getLogoProperties,
            getModelProperty,
            setLogoProperties,
            setModelProp
        }}>
            {children}
        </Provider>
    )

}

export default UIProvider