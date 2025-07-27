import React from 'react';

export default function StatusBar({ players, current, colors }) {
  return (
    <div className="status-bar">
      {players.map((p, i) => (
        <div key={i} className={`player ${i === current ? 'active' : ''}`}>
          <strong>{p.name}</strong>
          {p.chips.map((c, idx) => (
            <span key={idx} className="chip" style={{ background: colors[c] }} />
          ))}
        </div>
      ))}
    </div>
  );
}