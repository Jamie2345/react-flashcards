import React from "react";
import "../../styles/errorpages.css";

export default function Unauthorized() {
  return (
    <div class="err-container">
      <h1>Oops!</h1>
      <p>It looks like you don't have access to this page.</p>
      <a href="/">Go back to home page</a>
    </div>
  )
}