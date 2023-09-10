import { QueryClient, QueryClientProvider } from 'react-query'
import './App.css'
import UsersTable from './components/UsersTable/UsersTable'
import { ReactQueryDevtools } from 'react-query/devtools'

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
