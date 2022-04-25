import Home from "../component/page/Home";
import Dashboard from "../component/page/Dashboard";
import Project from "../component/page/Project";
import ProjectBoard from '../component/page/ProjectBoard'
import ProjectUpdate from "../component/form/ProjectUpdate";
import NewProject from "../component/form/NewProject"
import Login from "../component/page/Login";

const routePath = [
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
        name: "Project Board",
        path: "/project/board/:id",
        protected: true,
        showLink: false,
        component: ProjectBoard
    },
    {
        name: "Project Update",
        path: "/project/update/:id",
        protected: true,
        showLink: false,
        component: ProjectUpdate
    },
    {
        name: "PForm",
        path: "/new-project",
        protected: true,
        showLink: false,
        component: NewProject
    },
    {
        name: "Login",
        path: "/login",
        protected: false,
        showLink: true,
        component: Login,
    }
]

export default routePath