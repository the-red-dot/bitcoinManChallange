// src/components/SelectedChallenge.jsx
import React from 'react';
import { FaCopy } from 'react-icons/fa'; // Importing the copy icon

function SelectedChallenge({ challenge }) {
  if (!challenge) return null;

  // Function to copy challenge description to clipboard
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(challenge.description)
      .then(() => {
        alert('הטקסט הועתק ללוח!');
      })
      .catch((err) => {
        console.error('שגיאה בעת העתקת הטקסט', err);
      });
  };

  return (
    <div className="selected-challenge">
      <h2>{challenge.title}</h2>
      <div className="challenge-description">
        <p>{challenge.description}</p>
        <button
          className="copy-button"
          onClick={copyToClipboard}
          aria-label="העתק את הטקסט"
          title="העתק את הטקסט"
        >
          <FaCopy />
        </button>
      </div>
    </div>
  );
}

export default SelectedChallenge;
