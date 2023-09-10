import { QueryClient, QueryClientProvider } from 'react-query'
import UsersTable from './components/UsersTable/UsersTable'
import './style/Global.scss'
import './style/App.scss'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='app'>
        <h1 className='title-list-users'>List Users</h1>
        <UsersTable />
      </div>
    </QueryClientProvider>
  )
}

export default App
