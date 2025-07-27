import React from 'react';

export default function Dice({ dice, onRoll }) {
  return (
    <div className="Dice">
      <button onClick={onRoll}>Roll Dice</button>
      <span>Dice: {dice}</span>
    </div>
  );
}