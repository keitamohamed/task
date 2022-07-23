import {usePaginate, usePost} from "../../hook/usePaginate";
import UsePagination from "../../hook/usePagination";
import Loading from "./Loading";

import ProjectContainer from "./ProjectContainer";


const DisplayProject = ({projects, numberOfPost, selectedProject, deleteProject, setProjectTask}) => {

    const {post, currentPage, postPerPage, loading, setCurrentPage} = usePaginate(projects, numberOfPost)
    const {currentPosts} = usePost(currentPage, postPerPage, projects)

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        projects.length > 0 && loading === false ? (
            <div className="contentPaginate">
                <div className="paginateDataWrapper">
                    <ProjectContainer
                        projects={currentPosts}
                        selectedProject={selectedProject}
                        deleteProject={deleteProject}
                        setProjectTask={setProjectTask} />
                </div>
                <UsePagination
                    postPerPage={postPerPage}
                    totalPost={post.length}
                    paginate={paginate} />
            </div>
        ) : <Loading loading={loading} color={'#36D7B7'} size={20} />
    )
}

export default DisplayProject