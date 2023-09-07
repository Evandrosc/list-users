import { QueryClient, QueryClientProvider } from 'react-query'
import './App.css'
import UsersTable from './components/UsersTable/UsersTable'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient();

function App() {
  

  return (
    <QueryClientProvider client={queryClient}>
    <>
     <h1>List Users</h1>
     <table>
        <UsersTable/>
     </table>
    </>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
