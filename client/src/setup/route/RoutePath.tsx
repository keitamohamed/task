import {Home} from "../../component/page/Home";
import {Dashboard} from "../../component/page/Dashboard";
import {Project} from "../../component/page/Project";
import {Login} from "../../component/page/Login"
import {Task} from "../../component/page/Task";
import {NewProject} from "../../component/page/NewProject";
import {UpdateProject} from "../../component/page/Update";

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
        path: "/task",
        protected: true,
        showLink: true,
        component: Project
    },
    {
        name: "Board",
        path: `board:id`,
        protected: true,
        showLink: false,
        component: Task
    },
    {
        name: "New Project",
        path: `/add`,
        protected: true,
        showLink: false,
        component: NewProject
    },
    {
        name: "Update Project",
        path: `/update:id`,
        protected: true,
        showLink: false,
        component: UpdateProject
    },
    // {
    //     name: "Task",
    //     path: `project/board:identifier`,
    //     protected: true,
    //     showLink: false,
    //     component: Task
    // },
    {
        name: "Login",
        path: "/login",
        protected: false,
        showLink: true,
        component: Login,
    }
]