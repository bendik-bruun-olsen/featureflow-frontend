// import './App.css'

import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/DashboardPage/DashboardPage"
import FeatureRequestPage from "./pages/FeatureRequestPage/FeatureRequestPage"
import FeatureOverviewPage from "./pages/FeatureOverviewPage/FeatureOverviewPage"
import IssuePage from "./pages/IssuePage/IssuePage"
import Navbar from "./components/Navbar"

function App() {

  return (
    <BrowserRouter>
    <Navbar/>
    <main>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/features" element={<FeatureOverviewPage/>}/>
        <Route path="/request-feature" element={<FeatureRequestPage/>}/>
        <Route path="/issues" element={<IssuePage/>}/>
      </Routes>
    </main>
    </BrowserRouter>
  )
}

export default App
