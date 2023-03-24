import React, { useState } from 'react'

export default function Navbar() {
  
  return (
    <header className="header">
      <a href="#" class="logo">Flashcards.</a>
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