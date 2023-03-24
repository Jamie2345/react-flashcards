import React, { useState } from 'react'

export default function Flashcard ( {flashcard, active, slide, z} ) {
  const [flip, setFlip] = useState(false)

  let cardClass = ''

  if (slide) {
    cardClass = 'slide'
  }
  else {
    cardClass = active ? 'active' : 'hidden'
  }

  return (
    <div 
      className={`card ${cardClass} ${flip ? 'flip' : ''}`} 
      onClick={() => setFlip(!flip)}
      style={{zIndex: `${z}`}}>
      
      <div className="front">{flashcard.question}</div>
      <div className="back">{flashcard.answer}</div>
    </div>
  )
}