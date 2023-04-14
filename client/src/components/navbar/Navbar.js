import React from 'react'
import "../../styles/navbar.css";
import 'remixicon/fonts/remixicon.css'

export default function Navbar({ username }) {
  
  return (
    <header className="header">
      <div className="account-container">
        <a href='/account' className='account-link'>
          <img src="/account.jpg" className='pfp' />
          <span>{username}</span>
        </a>
      </div>
      <nav>
        <ul class='nav-links'>
          <a href="#" className="active">My Decks</a>
          <a href="#">All Decks</a>
          <a href="#">Friends</a>
          <a href="#">Leaderboards</a>
        </ul>
      </nav>
      <div className="search-container">
        <input type="text" className='search-box' placeholder='search'></input>
        <i class="ri-search-line"></i>
      </div>
    </header>
  )
}