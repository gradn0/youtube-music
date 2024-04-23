import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Collection from './components/Collection.tsx'
import Collections from './components/Collections.tsx'
import NotFoundPage from './components/NotFoundPage.tsx'
import { CollectionContextProvider } from './context/collectionContext.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <Collections />
      },
      {
        path: "/collection/:collectionTitle",
        element: <Collection />
      },
      
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CollectionContextProvider>
      <RouterProvider router={router}/>
    </CollectionContextProvider>
  </React.StrictMode>
)
