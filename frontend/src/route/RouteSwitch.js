import {useContext, useEffect} from "react"
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {useDispatch} from "react-redux"

import {GET_REQUEST} from "../action/request";
import routePath from "./RoutePath";
import {AuthContext} from "../component/context/Context";

const RouteSwitch = () => {
    const dispatch = useDispatch()
    const authCtx = useContext(AuthContext)
    
    const setCredential = (credential) => {
        authCtx.setUserCredential(credential)
    }
    
    const setAuthError = () => {

    }

    const windowRefresh = (token) => {
        const url = token ? token : "/user/access/refresh/token"
        dispatch(GET_REQUEST(url, setCredential, setAuthError, null))
    }

    const getCookie = () => {
        const cookie = ('; ' + document.cookie).split(`; taskRefreshToken=`).pop().split(';')[0];
        console.log(cookie)
        windowRefresh(cookie)
        return !!cookie
    }

    useEffect(() => {
        if (window.performance && performance.navigation.type === 1) {
            windowRefresh()
        }
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                {
                    routePath.map((route, index) => {
                        const isAuth = authCtx.cookie['accessToken'] ?
                            authCtx.cookie['accessToken'] : getCookie()

                        return (
                            route.protected ? (
                                <Route key={index} {...route} element={
                                    isAuth ? <route.component /> : <Navigate replace to={"/"} />}
                                />
                            ) : <Route key={index} path={route.path} element={< route.component />} />
                        )
                    })
                }
            </Routes>
        </BrowserRouter>
    )
}

export default RouteSwitch