

export const Pagination = (props: {totalPost: number, postPerPage: number, paginate: (num: number) => void}) => {

    const pages = []

    for (let i = 1; i <= Math.ceil(props.totalPost / props.postPerPage); i++) {
        pages.push(i)
    }

    return (
        <div className="paginationWrapper grid min-w-[50%] justify-content gap-2 m-auto mt-3 p-1 rounded-lg">
            {
                pages.map((pageNumber, index) => (
                    <div
                        key={`${pageNumber}_${index}`}
                        className="paginationBtnContainer"
                    >
                        <li
                            className="pageItem btn"
                            key={pageNumber}
                            onClick={() => props.paginate(pageNumber)}
                        >
                            {pageNumber}
                        </li>
                    </div>
                ))
            }
        </div>
    )
}