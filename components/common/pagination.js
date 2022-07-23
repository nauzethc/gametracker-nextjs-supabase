import { DEFAULT_PAGE_SIZE } from '../../config'

export default function Pagination ({
  currentPage = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  total = 0,
  onPageChange,
  className = ''
}) {
  const totalPages = Math.ceil(Number(total) / Number(pageSize))
  if (totalPages <= 1) return null

  const handlePageClick = (e) => {
    e.preventDefault()
    if (typeof onPageChange === 'function') {
      onPageChange(e.target.value)
    }
  }

  let pages = [...new Array(totalPages)].map((_, index) => index + 1)
  const current = Number(currentPage)

  if (pages.length > 9) {
    const lastPage = pages.length - 1
    pages = [...(new Set([
      ...pages.slice(0, 3),
      ...pages.slice(Math.max(current - 2, 0), Math.min(current + 1, lastPage)),
      ...pages.slice(lastPage - 3, lastPage)]))
    ].sort((a, b) => a - b)

    return (
      <div className={`btn-group ${className}`}>
        {pages.map(pageNumber => pageNumber === current
          ? <button key={pageNumber} className="btn btn-active">{pageNumber}</button>
          : <button key={pageNumber}
              onClick={handlePageClick}
              value={pageNumber}
              className="btn">
                {pageNumber}
            </button>)
        }
      </div>
    )
  }

  return (
    <div className={`btn-group ${className}`}>
      {pages.map(pageNumber => pageNumber === current
        ? <button key={pageNumber} className="btn btn-active">{pageNumber}</button>
        : <button key={pageNumber}
            onClick={handlePageClick}
            value={pageNumber}
            className="btn">
              {pageNumber}
          </button>)
      }
    </div>
  )
}
