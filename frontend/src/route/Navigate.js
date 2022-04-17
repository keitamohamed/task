import {Navigate, Route} from "react-router-dom"

const Router = ({element: Component, ...rest}) => {
    const isAuth = false;
    return (
        rest.protected ? (
            <ProjectedRoute
                path={rest.path}
                isAuth={isAuth}
                element={Component}
            />
        ) : <Route {...rest}  element={<Component />} />
    )

}
const ProjectedRoute = ({isAuth, element: Component, ...rest}) => {

    return (
        <Route
            {...rest}
            element={ isAuth ? (<Component /> ): (<Navigate replace to={"/"} />) }
        />
    )
}

export default Router