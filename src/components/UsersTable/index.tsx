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
  const maxPageButtons = 5 // Número máximo de botões numerados a serem exibidos

  // Função para atualizar o estado de pesquisa
  const handleSearch = (term: any) => {
    setSearchTerm(term)
    setCurrentPage(1) // Quando a pesquisa é atualizada, volte para a primeira página
  }

  // Filtrar os dados com base no termo de pesquisa
  const filteredData = usersCache
    ?.filter((user) =>
      user.name.first.toLowerCase().includes(searchTerm.toLowerCase())
    )

  // Calcular o número total de páginas com base nos resultados filtrados
  const totalPages = Math.ceil((filteredData?.length || 0) / usersPerPage)

  // Calcular o índice do último usuário exibido com base na página atual
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage

  // Função para navegar para a próxima página
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  // Função para navegar para a página anterior
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  // Calcular o índice do primeiro botão numerado a ser exibido
  const firstPageButton = Math.max(
    Math.min(currentPage - Math.floor(maxPageButtons / 2), totalPages - maxPageButtons + 1),
    1
  )

  // Calcular o índice do último botão numerado a ser exibido
  const lastPageButton = Math.min(
    firstPageButton + maxPageButtons - 1,
    totalPages
  )

  // Gerar botões numerados de página
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
      {/* Renderizar botões de página numerados */}
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
