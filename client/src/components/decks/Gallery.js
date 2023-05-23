import React from 'react'
import Deck from './Deck';

export default function Gallery({ decks }) {
  return (
    <div className='decks-gallery'>
      {decks.map((deck, i) => {
          return <Deck deck={deck} />
      })}
    </div>
  )
}