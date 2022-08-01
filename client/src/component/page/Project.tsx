import {useContext} from "react";
import {useNavigate} from "react-router-dom"

import Header from "./Header";
import {UIContent} from "../../setup/context/Context";
import {BsPlus} from "react-icons/bs";
import {useAppSelector} from "../../setup/store/ReduxHook";
import NoData from "../sub_component/NoDate";
import {ProjectPost} from "../sub_component/ProjectPost";
import {Notification} from "../sub_component/Notification";


export const Project = () => {
    const uiCtx = useContext(UIContent)
    const nav = useNavigate()
    const {projects} = useAppSelector((state) => state.project)

    const navigate = (to: string) => {
        nav(to)
    }

    return ( <div className='project'>
        <Header width={uiCtx.getLogoProperties()?.width} color={uiCtx.getLogoProperties()?.color}/>
        <Notification/>
        <div className="mainContainer">
            <div className="contentButtonContainerPlus">
                <li>
                    <BsPlus
                        style={{color: '#557B83'}}
                        onClick={() => navigate("/new-project")}
                    />
                    <br/>
                    <span>New Project</span>
                </li>
            </div>
            <div className={`projectsContainer min-h-full`}>
                {
                    projects?.length !== 0 ?
                        <ProjectPost numPostPerPage={2} />
                        : <NoData message={`No projects to display`}/>
                }
            </div>
        </div>
    </div>)
}