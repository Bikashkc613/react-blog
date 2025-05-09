import React from 'react'
import Register from './pages/Register'
import Login from './pages/Login'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AuthProvider from './context/AuthProvider'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/blogs' element={<Home />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/Login' element={<Login />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
