// src/components/SelectedChallenge.jsx
import React from 'react';

function SelectedChallenge({ challenge }) {
  if (!challenge) return null;

  return (
    <div className="selected-challenge">
      <h2>{challenge.title}</h2>
      <p>{challenge.description}</p>
    </div>
  );
}

export default SelectedChallenge;
