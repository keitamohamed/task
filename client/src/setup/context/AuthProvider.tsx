import {useCookies} from "react-cookie"
import {AuthContext} from "./Context";
import {Props} from "../../component/interface/interface"

const {Provider} = AuthContext

interface CookieProp {
    cookie: [token: string, name: string, userID: number, email: string]
}

interface CredentialsType {
    accessToken: string,
    name: string,
    userID: string,
    email: string
}
export const AuthProvider = ({children}: Props) => {

    const [cookie, setCookie, removeCookie] = useCookies(
        ['accessToken', 'name', 'userID', 'email'])
    
    const setCredentials = (credentials: CredentialsType) => {
        setCookie('accessToken', credentials.accessToken)
        setCookie('name', credentials.name)
        setCookie('userID', credentials.userID)
        setCookie('email', credentials.email)
    }

    return (
        <Provider value={{
            cookie,
        }}>
            {children}
        </Provider>
    )

}