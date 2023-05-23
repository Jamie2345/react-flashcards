import React from "react";
import '../styles/homepage.css';

export default function HomePage() {
  return (
    <>
      <div class="main-homepage-container">
        <div class="intro">
          <h1>The No.1 Flashcard App</h1>
          <p>With our flashcard creation platform, you can utilize cutting-edge spaced repetition algorithms to optimize your study time and achieve your learning goals in record time.</p>
          <div class="signup-login">
            <a href="/register">
              <button class="btn-hover color-3">Sign Up</button>
            </a>
            <a href="/login">
              <button class="btn-hover color-1">Log In</button>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}