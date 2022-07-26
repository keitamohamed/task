import {useEffect, useState} from "react";

const usePaginate = (post, numberPostPerPage) => {

    const [posts, setPost] = useState({})
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage] = useState(numberPostPerPage)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [posts, numberPostPerPage])

    return{post, currentPage, postPerPage, loading, setCurrentPage}
}

const usePost = (currentPage, postPerPage, post) => {
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = post?.slice(indexOfFirstPost, indexOfLastPost)

    return {currentPosts}
}

export {
    usePaginate,
    usePost
}