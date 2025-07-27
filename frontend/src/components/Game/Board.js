// src/components/Board.jsx
import React from 'react';

export default function Board({ board, players, colors, onCellClick }) {
  return (
    <div className="board">
      {board.map((cell, idx) => (
        <div key={idx} className={`cell ${cell?.type || ''}`} onClick={() => onCellClick(idx)}>
          {players.map((p, i) => p.position === idx && (
            <div key={i} className="token" style={{ background: colors[i] }} />
          ))}
        </div>
      ))}
    </div>
  );
}