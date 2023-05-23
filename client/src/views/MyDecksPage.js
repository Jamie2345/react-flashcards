import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

import Navbar from "../components/navbar/Navbar";
import Gallery from "../components/decks/Gallery";
import "../styles/flashcards.css";
import "../styles/deckspage.css";

import useAxiosPrivate from "../hooks/useAxiosPrivate";

export default function MyDecksPage() {
  const axiosPrivate = useAxiosPrivate();

  const { auth } = useAuth();

  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState(null);
  const [decks, setDecks] = useState([]);
  const [attemptCount, setAttemptCount] = useState(0)
  
  useEffect(() => {
    if (auth) {
      axiosPrivate.get(`/api/decks`)
        .then(res => {
          const decks = res.data
          console.log(decks)
          setDecks(decks)
          setLoading(false)
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
  
  console.log(decks)

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : errMsg ? (
        <p>{errMsg}</p>
      ) : (
        <>
          <Navbar username={auth.username} />
          <div className="main-deckpage-container">
            <div className="gallery-container">
              <Gallery decks={decks}/>
            </div>
          </div>
        </>
      )}
    </>
  );

}