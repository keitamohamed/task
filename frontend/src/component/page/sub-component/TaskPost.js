import {usePaginate, usePost} from "../../custom-hook/usePaginate";
import TaskContainer from "./TaskContainer";
import UsePagination from "../../custom-hook/usePagination";
import Loading from "./Loading";

const TaskPost = ({tasks, numberOfPost, toggleTaskUpdate, deleteAction}) => {

    const {post, currentPage, postPerPage, loading, setCurrentPage} = usePaginate(tasks, numberOfPost)
    const {currentPosts} = usePost(currentPage, postPerPage, tasks)

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            {
                tasks.length > 0 && !loading ? (
                    <div className="taskContainer">
                        <nav>
                            <li>
                                <h2>To Do</h2>
                            </li>
                            <li>
                                <h2>In Progress</h2>
                            </li>
                            <li>
                                <h2>Completed</h2>
                            </li>
                        </nav>
                        <TaskContainer
                            tasks={currentPosts}
                            deleteAction={deleteAction}
                            toggleTaskUpdate={toggleTaskUpdate}
                        />
                        <UsePagination
                            paginate={paginate}
                            totalPost={post.length}
                            postPerPage={postPerPage}
                        />
                    </div>
                ) : <Loading loading={loading} color={'#36D7B7'} size={20} />
            }
        </>
    )
}

export default TaskPost