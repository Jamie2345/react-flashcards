import React from 'react'

export default function Navbar({ username }) {
  
  return (
    <header className="header">
      <a href="#" class="logo">Flashcards.</a>
      <h1>{username}</h1>
      <nav className="navbar">
        <ul>
          <a href="#" className="active">Home</a>
          <a href="#">Search</a>
          <a href="#">Account</a>
        </ul>
      </nav>
    </header>
  )
}