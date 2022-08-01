import {Link} from "react-router-dom";
import moment from "moment";

import {MdDashboard} from "react-icons/md";
import {FiCheckSquare} from "react-icons/fi";
import {AiFillDelete} from "react-icons/ai";
import {useProject} from "../../hook/useProject";
import {useTask} from "../../hook/useTask";

interface PostProps {
    currentPost: any[];
}

let notification: HTMLElement | null;

export const Post = (props: PostProps) => {
    const {findProjectByIdentifier, setProjectTasks, deleteProject} = useProject()
    const {loadTask} = useTask()

    const showNotification = () => {
        if (notification === null || notification === undefined) {
            notification = document.querySelector('.notification')
        }
        notification?.removeAttribute('closed')
        notification?.setAttribute('open', '')
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
                            <div className="contentLeft col-span-1 mt-2">
                                <p>{project.identifier}</p>
                            </div>
                            <div className="contentMiddle col-span-8">
                                <div className="context">
                                    <h2>{project.name}</h2>
                                    <p>{project.description}</p>
                                    <p className='projectDate'>
                                        {`Start Date: ${moment(project.start).format('MMM DD YYYY')} - 
                                                Due Date: ${moment(project.endDate).format('MMM DD YYYY')}`}
                                    </p>
                                </div>
                            </div>
                            <div className="contentRight col-span-3 min-w-full">
                                <Link
                                    to={`/project/board/${project.identifier}`}
                                    onClick={() => setProjectTasks(project.identifier)}
                                    className={`flex justify-content gap-2`}
                                >
                                    <MdDashboard className={'mt-1'} style={{color: '#0093AB'}} />
                                    <span className={"largeDevices"}>Project Board</span>
                                    <span className={"smallDevices"}>Board</span>
                                </Link>
                                <Link
                                    className={`flex justify-content gap-2`}
                                    to={`/project/update/${project.identifier}`}
                                    onClick={() => findProjectByIdentifier(project.identifier)}
                                >
                                    <FiCheckSquare
                                        className={'mt-1'}
                                        style={{color: '#019267'}} />
                                    <span className={"largeDevices"}>Update Project</span>
                                    <span className={"smallDevices"}>Update</span>
                                </Link>
                                <Link
                                    className={`flex justify-content gap-2`}
                                    to={``}
                                    onClick={() => deleteProject(project.identifier, showNotification)}>
                                    <AiFillDelete
                                        className={'mt-1'}
                                        style={{color: '#E83A14'}} />
                                    <span className={"largeDevices"}>Delete Project</span>
                                    <span className={"smallDevices"}>Delete</span>
                                </Link>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}