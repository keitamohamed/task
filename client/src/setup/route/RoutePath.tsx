import {Home} from "../../component/page/Home";
import {Dashboard} from "../../component/page/Dashboard";
import {Project} from "../../component/page/Project";
import {Login} from "../../component/page/Login"

export const routePath = [
    {
        name: "Home",
        path: "/",
        protected: false,
        showLink: false,
        component: Home
    },
    {
        name: "Dashboard",
        path: "/dashboard",
        protected: true,
        showLink: true,
        component: Dashboard
    },
    {
        name: "Project",
        path: "/project",
        protected: true,
        showLink: true,
        component: Project
    },
    {
        name: "Login",
        path: "/login",
        protected: false,
        showLink: true,
        component: Login,
    }
]