import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import UserProfile from './components/UserProfile/index.tsx'
import PageError from './components/PageError/index.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <PageError />,
  },
  {
    path: '/user/:username',
    element: <UserProfile />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
