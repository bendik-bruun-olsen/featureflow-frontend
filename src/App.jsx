// import './App.css'

import { Outlet, RouterProvider } from "react-router-dom"
import router from "./routes"
import Navbar from "./components/Navbar"

function App() {

  return (
    <RouterProvider router={router}>
    <Navbar/>
      <main>
        <Outlet/>
      </main>
    </RouterProvider>
  )
}

export default App
