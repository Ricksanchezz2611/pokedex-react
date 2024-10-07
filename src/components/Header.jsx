import React, { useState } from 'react'
import logo from '../assets/logo.png'
import Button from './Button'
import '../css/Header.css'
import { Link } from 'react-router-dom'
const Header = () => {
  const [query,setquery] = useState("");
  return (
    <header>
        <nav className='maxWidth'>
          <img src={logo} alt="logo"></img>
          <div className="search-container">
            <input type="text" placeholder="search by name or id" value ={query} onChange={(e)=> setquery(e.target.value.toLowerCase())}/>
            <Link to={`${query}`}>
            <Button Label={"Search"}/>
            </Link>
            

          </div>
        </nav>
      </header>
  )
}

export default Header