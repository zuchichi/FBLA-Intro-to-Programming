{/* Important Imports*/}
import { useState } from 'react'
import { HashRouter as Router, Routes, Route, Outlet } from 'react-router-dom'

{/* Importing Components*/}
import './App.css'
import Button from './Components/Button'

{/* Importing Pages (in order) */}
import { Intro } from './Pages/Intro'
import { Home } from './Pages/Home'
import { Login } from './Pages/Login'
import { SignUp } from './Pages/SignUp'
import { Customize } from './Pages/Customize'
import { Pet } from './Pages/Pet'
import { PetStats } from './Pages/PetStats'
import { Marketplace } from './Pages/Marketplace'
import { FinancialLogistics } from './Pages/FinancialLogistics'
import { Chores } from './Pages/Chores'

function Layout() {
  return (
    <>
      <Outlet />
    </>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Intro />} />
          <Route path="/intro" element={<Intro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/customize" element={<Customize />} />
          <Route path="/pet" element={<Pet />} />
          <Route path="/petstats" element={<PetStats />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/financialogistics" element={<FinancialLogistics />} />
          <Route path="/home" element={<Home />} />
          <Route path="/chores" element={< Chores />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
