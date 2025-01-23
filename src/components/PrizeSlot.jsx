// src/components/PrizeSlot.jsx
import React from 'react';

function PrizeSlot({ prize, isActive }) {
  return (
    <div className={`slot-item ${isActive ? 'active' : ''}`}>
      {prize.label}
    </div>
  );
}

export default PrizeSlot;
