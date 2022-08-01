import {useCookies} from "react-cookie"
import {AuthContext} from "./Context";
import {Props, CredentialsType} from "../../interface_type/interface"

const {Provider} = AuthContext

const AuthProvider = ({children}: Props) => {

    const [cookie, setCookie, removeCookie] = useCookies(
        ['taskToken', 'name', 'userID', 'email'])


    const getCookie = (): any => {
        return cookie
    }
    
    const setCredentials = (credentials: CredentialsType) => {
        setCookie('taskToken', credentials.taskAccessToken)
        setCookie('email', credentials.email)
    }
    
    const setUserNameID = (data: {userID: string, name: string}): void => {
        setCookie('userID', data.userID)
        setCookie('name', data.name)
    }

    const logout = (): void => {
        const removeCredential = ['taskToken', 'name', 'userID', 'email']
        // @ts-ignore
        removeCredential.forEach(name => removeCookie(name))
    }

    return (
        <Provider value={{
            getCookie,
            setCredentials,
            setUserNameID,
            logout
        }}>
            {children}
        </Provider>
    )

}

export default AuthProvider