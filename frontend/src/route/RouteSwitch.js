import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import routePath from "./RoutePath";

const RouteSwitch = () => {

    return (
        <BrowserRouter>
            <Routes>
                {
                    routePath.map((route, index) => {
                        const isAuth = true;
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