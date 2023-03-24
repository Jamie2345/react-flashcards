
import React, { useState } from 'react'
import Flashcard from './Flashcard'

export default function FlashcardList({ flashcards }) {
  const [prev, setPrev] = useState(null)
  const [queue, setQueue] = useState(flashcards);

  const handleNextClick = () => {
    let nextQueue = [...queue];
    const currentCard = nextQueue.shift();

    nextQueue.push(currentCard);
    setQueue(nextQueue);
    setPrev(currentCard);
  };

  return (
    <>
      <div className="cards-container">
        {queue.map((flashcard, i) => {
          return <Flashcard flashcard={flashcard} active={i === 0} slide={flashcard===prev} z={queue.length - i} key={flashcard.id + new Date()} />
        })}
      </div>
      <button onClick={() => handleNextClick()}>Next Card</button>
    </>
  )
}