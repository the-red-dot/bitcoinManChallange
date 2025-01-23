// src/components/ChallengeSlot.jsx
import React from 'react';

function ChallengeSlot({ challenge, isActive }) {
  return (
    <div className={`slot-item ${isActive ? 'active' : ''}`}>
      {challenge.title}
    </div>
  );
}

export default ChallengeSlot;
