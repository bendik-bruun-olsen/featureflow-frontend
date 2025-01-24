// import './App.css'

import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage"
import Page1 from "./pages/Page1/Page1"
import Page2 from "./pages/Page2/Page2"
import Navbar from "./components/Navbar"

function App() {

  return (
    <BrowserRouter>
    <Navbar/>
    <main>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/page1" element={<Page1/>}/>
        <Route path="/page2" element={<Page2/>}/>
      </Routes>
    </main>
    </BrowserRouter>
  )
}

export default App
