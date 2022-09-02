import {useContext} from "react";
import {Link} from "react-router-dom";
import moment from "moment";

import {MdDashboard} from "react-icons/md";
import {FiCheckSquare} from "react-icons/fi";
import {AiFillDelete} from "react-icons/ai";
import {useProject} from "../../hook/useProject";
import {useTask} from "../../hook/useTask";
import {NotificationContext} from "../../setup/context/Context";
import {useAppSelector, useAppDispatch} from "../../setup/store/ReduxHook";
import {projectAction} from "../../setup/slice/project";

interface PostProps {
    currentPost: any[];
}

export const Post = (props: PostProps) => {
    const dispatch = useAppDispatch()
    const {projects} = useAppSelector((state) => state.project)
    const {showNotification} = useContext(NotificationContext)
    const {findProjectByIdentifier} = useProject()
    const {loadTask} = useTask()

    const setSelectedProject = async (identifier: string) => {
        const selectedProject = projects.find((project) => project.identifier === identifier)
        dispatch(projectAction.selectedProject(selectedProject))
        await showNotification(
            'Delete Project',
            `Are you sure you want to delete project ${identifier}?`,
            identifier
        )
    }

    return (
        <>
            {
                props.currentPost.map((project, index) => {
                    return (
                        <div
                            className={`projectContent 
                            grid grid-cols-12 mt-3 p-2 border border-sky-500 min-w-full min-h-full`}
                            key={`${project.identifier}_${index}`}
                        >
                            <div className="contentLeft col-span-2 !min-w-full mt-2">
                                <p>{project.identifier}</p>
                            </div>
                            <div className="contentMiddle col-span-10 !min-w-full">
                                <div className="context">
                                    <h2>{project.name}</h2>
                                    <p>{project.description}</p>
                                    <p className='projectDate'>
                                        {`Start Date: ${moment(project.start).format('MMM DD YYYY')} - 
                                                Due Date: ${moment(project.endDate).format('MMM DD YYYY')}`}
                                    </p>
                                </div>
                            </div>
                            <div className="contentRight grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 !col-span-12 !min-w-full">
                                <Link
                                    to={`/board:${project.id}`}
                                    className={`flex justify-content gap-2`}
                                    onClick={() => loadTask(project.identifier)}
                                >
                                    <MdDashboard className={'mt-1'} style={{color: '#0093AB'}} />
                                    <span className={"sm:hidden md:hidden lg:hidden xl:inline-block"}>Project Board</span>
                                    <span className={"sm:inline-block md:inline-block lg:inline-block xl:hidden"}>Board</span>
                                </Link>
                                <Link
                                    className={`flex justify-content gap-2`}
                                    to={`/update${project.id}`}
                                    onClick={() => findProjectByIdentifier(project.identifier)}
                                >
                                    <FiCheckSquare
                                        className={'mt-1'}
                                        style={{color: '#019267'}} />
                                    <span className={"sm:hidden md:hidden lg:hidden xl:inline-block"}>Update Project</span>
                                    <span className={"sm:inline-block md:inline-block lg:inline-block xl:hidden"}>Update</span>
                                </Link>
                                <Link
                                    className={`flex justify-content gap-2`}
                                    to={``}
                                    onClick={() => setSelectedProject(project.identifier)}>
                                    <AiFillDelete
                                        className={'mt-1'}
                                        style={{color: '#E83A14'}} />
                                    <span className={"sm:hidden md:hidden lg:hidden xl:inline-block"}>Delete Project</span>
                                    <span className={"sm:inline-block md:inline-block lg:inline-block xl:hidden"}>Delete</span>
                                </Link>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}