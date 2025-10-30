import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Result from './Pages/Result'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import BuyCredit from './Pages/BuyCredit'


const App = () => {
  return (
    <div className='bg- -200 h-screen'>
        <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/result' element={<Result/>}/>
        <Route path='/buy' element={<BuyCredit/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App