import React from 'react'


/* Have a way for user to pick color and set cover images */

/* Generate encouraging messages on the back */

export default function Deck ( {deck} ) {
  console.log(deck)
  return (
    <div className="deck-container">
      <div 
        className='deck'
      >
        <div className="front" style={{backgroundColor: 'green'}}>
          <div class='deck-name-container'>
            <span>{deck.name}</span>
          </div>
        </div>
        <div className="back" style={{backgroundColor: 'purple'}}>
          <span class="cards-amount">{Math.floor(Math.random()*100)}</span>
          <span class="review-message">Cards to review!</span>
        </div>
      </div>
    </div>
  )
}