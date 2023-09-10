import { useState } from 'react'
import '../../style/SearchInput.scss'

interface SearchInputProps {
  onSearch: (term: string) => void
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)
    onSearch(term) // Chama a função de pesquisa à medida que o usuário digita
  }

  return (
    <input
      type='text'
      placeholder='Search user....'
      value={searchTerm}
      onChange={handleInputChange}
      className='input'
    />
  )
}

export default SearchInput