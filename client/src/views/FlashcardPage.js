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
  //console.log(`auth: ${JSON.stringify(auth)}`);
 
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState(null);
  const [attemptCount, setAttemptCount] = useState(0)
  
  useEffect(() => {
    if (auth) {
      axiosPrivate.get('/api/flashcards?deck=64249e473009604d8f02c171')
        .then(res => {
          const cards = res.data.cards;
          setFlashcards(cards);
          setLoading(false);
          setAttemptCount(0)
        })
        .catch(error => {
          if (error.response.status === 401) {
            if (attemptCount >= 2) {
              setErrMsg("Unauthenticated");
              setLoading(false);
            }
            else {
              setAttemptCount(attemptCount + 1);
            }
          }
          else if (error.response.status === 404) {
            setErrMsg("Unable to find flashcards for this deck");
            setLoading(false);
          }
          else if (error.response.status === 500) {
            setErrMsg("Sever error while loading flashcards please try again")
            setLoading(false);
          }
          else {
            setErrMsg("Unexpected error while loading flashcards please try again")
          }
        });
    }
  }, [auth, attemptCount, axiosPrivate]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : errMsg ? (
        <p>{errMsg}</p>
      ) : (
        <>
          <Navbar username={auth.username} />
          <FlashcardList flashcards={flashcards} />
        </>
      )}
    </>
  );

}