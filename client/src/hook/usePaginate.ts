import {useEffect, useState} from "react";

export const usePaginate = (numPostPerPage: number) => {
    const [currentPost, setCurrentPost] = useState(1);
    const [postPerPage] = useState(numPostPerPage)
    const [pageLoaded, setPageLoaded] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setPageLoaded(false)
        }, 500)
    }, [numPostPerPage])

    return {currentPost, postPerPage, pageLoaded, setCurrentPost}
}

export const usePost = (post: any[], currentPage: number, postPerPage: number) => {
    const indexOfLastPage = currentPage * postPerPage;
    const indexOfFirstPage = indexOfLastPage - postPerPage;
    const currentPosts = post.slice(indexOfFirstPage, indexOfLastPage)

    return {currentPosts}
}