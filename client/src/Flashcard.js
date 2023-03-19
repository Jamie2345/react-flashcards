import React, { useState } from 'react'

export default function ( {flashcard, active, z} ) {
  const [flip, setFlip] = useState(false)

  return (
    <div 
      className={`card ${active ? 'active' : 'hidden'} ${flip ? 'flip' : ''}`} 
      onClick={() => setFlip(!flip)}
      style={{zIndex: `${z}`}}>
      
      <div className="front">{flashcard.question}</div>
      <div className="back">{flashcard.answer}</div>
    </div>
  )
}