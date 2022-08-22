import {usePaginate, usePost} from "../../hook/usePaginate";
import { useAppSelector } from "../../setup/store/ReduxHook";
import {Post} from "./Post";
import NoData from "./NoDate";
import {Pagination} from "./Pagination";

export const ProjectPost = (post: {numPostPerPage: number}) => {
    const {projects} = useAppSelector((state) => state.project)
    const {currentPost, postPerPage, pageLoaded, setCurrentPost} = usePaginate(post.numPostPerPage)
    const {currentPosts} = usePost(projects, currentPost, postPerPage)

    const paginate = (pageNum: number) => setCurrentPost(pageNum)

    return (
        projects.length !== 0 && !pageLoaded ? (
            <div className='contentPaginate justify-center grid gap-3'>
                <div className="paginateDataWrapper grid !xl:min-w-full xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 gap-2">
                    <Post currentPost={currentPosts} />
                </div>
                <Pagination
                    postPerPage={postPerPage}
                    totalPost={projects.length}
                    paginate={paginate}
                />
            </div>
        ) : <NoData message={"No Project is available"}/>
    )
}