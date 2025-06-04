import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignOut from './pages/SignOut'
import About from './pages/about'
import Profile from './pages/Profile'
import Header from './components/Header'
const App = () => {
  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/sign-in' element={<SignIn/>}/>
      
      <Route path='/sign-up' element={<SignOut/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/profile' element={<Profile/>}/>
    </Routes>
    
    </>
  )
}

export default App