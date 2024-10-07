import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Searchedpokemon from './pages/Searchedpokemon'

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route  path={"/"} element={<Home />} />
        <Route path={"/:pokemon"} element={<Searchedpokemon/>} />
      </Routes>
    </div>
  )
}

export default App