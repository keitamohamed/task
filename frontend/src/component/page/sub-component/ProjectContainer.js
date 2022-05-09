import moment from "moment";
import {Link} from "react-router-dom";
import {MdDashboard} from "react-icons/md";
import {FiCheckSquare} from "react-icons/fi";
import {AiFillDelete} from "react-icons/ai";

const ProjectContainer = ({projects, selectedProject, deleteProject, setProjectTask}) => {

    return (
        projects.map((project, index) => {
            return (
                <div className="projectContent"
                     key={index}>
                    <div className="contentLeft">
                        <p>{project.identifier}</p>
                    </div>
                    <div className="contentMiddle">
                        <div className="context">
                            <h2>{project.name}</h2>
                            <p>{project.description}</p>
                            <p className='projectDate'>
                                {`Start Date: ${moment(project.start).format('MMM DD YYYY')} - 
                                                Due Date: ${moment(project.endDate).format('MMM DD YYYY')}`}
                            </p>
                        </div>
                    </div>
                    <div className="contentRight">
                        <Link to={`/project/board/${project.identifier}`} onClick={() => setProjectTask(project.identifier)}>
                            <MdDashboard style={{color: '#0093AB'}} />
                            <span>Project Board</span>
                        </Link>
                        <Link
                            to={`/project/update/${project.id}`}
                            onClick={() => selectedProject(project.identifier)}
                        >
                            <FiCheckSquare style={{color: '#019267'}} />
                            <span>Update Project</span>
                        </Link>
                        <Link to={``} onClick={() => deleteProject(project.identifier)}>
                            <AiFillDelete style={{color: '#E83A14'}} />
                            <span>Delete Project</span>
                        </Link>
                    </div>
                </div>
            )
        })
    )



}

export default ProjectContainer