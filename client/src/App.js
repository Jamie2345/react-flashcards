import React, { useEffect, useState } from "react";
import FlashcardList from "./FlashcardList";
import "./app.css";
import axios from "axios";

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/flashcards')
      .then(res => {
        setFlashcards(res.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    loading ? (
      <p>Loading...</p>
    ) : (
      <FlashcardList flashcards={flashcards} />
    )
  );
}

export default App;