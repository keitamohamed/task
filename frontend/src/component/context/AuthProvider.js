import {useCookies} from "react-cookie";

import {AuthContext} from "./Context";
const {Provider} = AuthContext

const AuthProvider = ({children}) => {

    const [cookie, setCookie, removeCookie] = useCookies(
        ['accessToken', 'name', 'userID', 'email', 'read', 'write', 'role'])
    
    const setUserCredential = ({accessToken, email, READ, WRITE, ROLE_USER}) => {
        setCookie('accessToken', accessToken)
        setCookie('email', email)
        setCookie('read', READ)
        setCookie('write', WRITE)
        setCookie('role', ROLE_USER)
    }

    const seUserIDAndName = ({userId, name}) => {
        setCookie('name', name)
        setCookie('userID', userId)
    }

    const logout = () => {
        const removeCredential = ['accessToken', 'name', 'userID', 'email', 'read', 'write', 'role']
        removeCredential.forEach(name => removeCookie(name))
    }

    return (
        <Provider value={{
            setUserCredential,
            seUserIDAndName,
            logout,
            cookie}}>
            {children}
        </Provider>
    )
}

export default AuthProvider