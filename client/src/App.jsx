import { useState } from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'



function App() {

  const router = createBrowserRouter([
    {
      path:"/bfhl",
      element:<Protected><Home/></Protected>
    },
    {
      path:"/bfhl",
      element:<Protected><BFHL/></Protected>
    }
  ])

  return (
    <>
        <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
