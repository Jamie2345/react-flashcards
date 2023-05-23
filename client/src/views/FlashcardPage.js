import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'

import useAuth from "../hooks/useAuth";

import FlashcardList from "../components/flashcards/FlashcardList";
import Navbar from "../components/navbar/Navbar";
import "../styles/flashcards.css";

import useAxiosPrivate from "../hooks/useAxiosPrivate";

const useQuery = () => new URLSearchParams(useLocation().search);

export default function FlashcardPage() {
  const axiosPrivate = useAxiosPrivate();

  const { auth } = useAuth();
  //console.log(`auth: ${JSON.stringify(auth)}`);

  const query = useQuery();
  const deck = query.get('deck');

  console.log(deck)
 
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState(null);
  const [attemptCount, setAttemptCount] = useState(0)
  
  useEffect(() => {
    if (auth) {
      axiosPrivate.get(`/api/flashcards?deck=${deck}`)
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
          else if (error.response.status === 403) {
            console.log(error.response)
            setErrMsg("You are not allowed to view this deck")
            setLoading(false);
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
          <div class="main-flashcards-container">
            <Navbar username={auth.username} />
            <FlashcardList flashcards={flashcards} />
          </div>
        </>
      )}
    </>
  );

}