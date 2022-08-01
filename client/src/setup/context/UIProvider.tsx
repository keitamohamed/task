import {useState} from "react";

import {UIContent} from "./Context";
import {LogoProperty, Props} from "../../interface_type/interface"

const {Provider} = UIContent

const UIProvider = ({children}: Props) => {

    const [logoProperty, setLogoProperty] = useState<LogoProperty>({
        color: "",
        width: ""
    })
    
    const getLogoProperties = (): any => {
      return logoProperty;
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
            setLogoProperties
        }}>
            {children}
        </Provider>
    )

}

export default UIProvider