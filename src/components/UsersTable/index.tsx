import { useState } from 'react'
import { useQuery } from 'react-query'
import { getUsers, usersCache } from '../../api/api'
import { User } from '../../Tipagem/User'
import { Link } from 'react-router-dom'
import SearchInput from '../SearchInput'

import '../../style/UsersTable.scss'
import setaEsquerda from '../../img/setaEsquerda.svg'
import setaDireita from '../../img/setaDireita.svg'
import '../../style/Pagination.scss'

export const UsersTable = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  useQuery(['users'], () => getUsers(50), {
    staleTime: Infinity,
  })

  const usersPerPage = 10
  const maxPageButtons = 5

  const handleSearch = (term: any) => {
    setSearchTerm(term)
    setCurrentPage(1) 
  }

  const filteredData = usersCache
    ?.filter((user) =>
      user.name.first.toLowerCase().includes(searchTerm.toLowerCase())
    )

  const totalPages = Math.ceil((filteredData?.length || 0) / usersPerPage)

  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const firstPageButton = Math.max(
    Math.min(currentPage - Math.floor(maxPageButtons / 2), totalPages - maxPageButtons + 1),
    1
  )

  const lastPageButton = Math.min(
    firstPageButton + maxPageButtons - 1,
    totalPages
  )

  const pageButtons = []
  for (let i = firstPageButton; i <= lastPageButton; i++) {
    pageButtons.push(
      <button
        key={i}
        onClick={() => setCurrentPage(i)}
        className={`page-button ${i === currentPage ? 'active' : ''}`}
      >
        {i}
      </button>
    )
  }

  return (
    <>
      <SearchInput onSearch={handleSearch} />
      <table className='table-users'>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Title</th>
            <th>Date</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData
            ?.slice(indexOfFirstUser, indexOfLastUser)
            .map((user: User) => (
              <tr key={user.login.username}>
                <td>{user.login.username}</td>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.name.title}</td>
                <td>{new Date(user.dob.date).toLocaleDateString()}</td>
                <td>{user.dob.age}</td>
                <td>
                  <Link to={`/user/${user.login.username}`}>View profile</Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className='pagination'>
        <button onClick={prevPage} disabled={currentPage === 1} className='btnNextPage'>
          <img src={setaEsquerda} alt='Anterior' />
        </button>
        {pageButtons}
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className='btnNextPage'
        >
          <img src={setaDireita} alt='Próxima' />
        </button>
      </div>
    </>
  )
}

export default UsersTable
