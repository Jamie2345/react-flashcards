import React from "react";
import "../../styles/errorpages.css";

export default function Missing() {
  return (
    <div class="err-container">
      <h1>404</h1>
      <p>Sorry, the page you're looking for cannot be found.</p>
      <a href="/">Go back to home page</a>
    </div>
  )
}