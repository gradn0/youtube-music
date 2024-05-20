import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Collection from './components/Collection.tsx'
import Collections from './components/Collections.tsx'
import NotFoundPage from './components/NotFoundPage.tsx'
import { CollectionContextProvider } from './context/collectionContext.tsx'
import { ClipContextProvider } from './context/clipContext.tsx'
import { AuthContextProvider } from './context/AuthContext.tsx'
import LoginPage from './components/LoginPage.tsx'
import SignupPage from './components/SignupPage.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: 
    <ProtectedRoute>
      <App />
    </ProtectedRoute>,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <Collections />
      },
      {
        path: "/collection/:collectionTitle",
        element: <Collection />
      }
    ]
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/signup",
    element: <SignupPage />
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ClipContextProvider>
        <CollectionContextProvider>
          <RouterProvider router={router}/>
        </CollectionContextProvider>
      </ClipContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
