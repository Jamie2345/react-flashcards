import React, { useEffect, useState } from "react";
import FlashcardList from "./components/flashcards/FlashcardList";
import Navbar from "./components/navbar/Navbar";

import "./styles/flashcards.css";
import "./styles/navbar.css";
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
      <>
        <Navbar></Navbar>
        <FlashcardList flashcards={flashcards} />
      </>
    )
  );
}

export default App;