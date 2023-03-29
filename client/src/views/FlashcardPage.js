import React, { useEffect, useState } from "react";

import useAuth from "../hooks/useAuth";

import FlashcardList from "../components/flashcards/FlashcardList";
import Navbar from "../components/navbar/Navbar";
import "../styles/flashcards.css";
import "../styles/navbar.css";

import useAxiosPrivate from "../hooks/useAxiosPrivate";

export default function FlashcardPage() {
  const axiosPrivate = useAxiosPrivate();

  const { auth } = useAuth();
  console.log(`auth: ${JSON.stringify(auth)}`);
 
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    axiosPrivate.get('/api/flashcards')
      .then(res => {
        setFlashcards(res.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [auth]);

  return (
    loading ? (
      <p>Loading...</p>
    ) : (
      <>
      <h1>{auth.username}</h1>
        <Navbar></Navbar>
        <FlashcardList flashcards={flashcards} />
      </>
    )
  );
}