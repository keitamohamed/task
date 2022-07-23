
const UsePagination = ({postPerPage, totalPost, paginate}) => {

    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div className="paginationWrapper">
            {
                pageNumbers.map(pageNumber => (
                    <div className="paginationBtnContainer">
                        <li
                            className="pageItem btn"
                            key={pageNumber}
                            onClick={() => paginate(pageNumber)}
                        >
                            {pageNumber}
                        </li>
                    </div>
                ))
            }
        </div>
    )
}

export default UsePagination