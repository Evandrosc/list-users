import { Link } from 'react-router-dom'
import '../../style/PageError.scss'

const PageError = () => {
  return (
    <>
      <div className='container-error'>
        <h1>Ocorreu um erro</h1>
        <p>Por favor, volte a página inicial</p>
        <Link to='/'>Página inicial</Link>
      </div>
    </>
  )
}

export default PageError