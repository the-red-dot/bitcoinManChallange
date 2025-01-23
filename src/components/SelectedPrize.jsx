// src/components/SelectedPrize.jsx
import React from 'react';

function SelectedPrize({ prize }) {
  if (prize === null) return null;

  return (
    <div className="selected-prize">
      <h2>{prize} ש"ח</h2>
    </div>
  );
}

export default SelectedPrize;
