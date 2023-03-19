
import React, { useState } from 'react'
import Flashcard from './Flashcard'

export default function FlashcardList({ flashcards }) {
  const [queue, setQueue] = useState(flashcards);

  const handleNextClick = () => {
    let nextQueue = [...queue];
    const currentCard = nextQueue.shift();

    console.log(currentCard);

    nextQueue.push(currentCard);
    setQueue(nextQueue);
  };

  return (
    <>
      <div className="cards-container">
        {queue.map((flashcard, i) => {
          return <Flashcard flashcard={flashcard} active={i === 0} z={queue.length - i} key={flashcard.id + new Date()} />
        })}
      </div>
      <button onClick={() => handleNextClick()}>Next Card</button>
    </>
  )
}