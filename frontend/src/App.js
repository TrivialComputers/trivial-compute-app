import React, { useEffect, useState } from 'react';
function App() {
  const [flask_msg, setFlaskMsg] = useState('');

  useEffect(() => {
    fetch('/api/version')
      .then(res => res.json())
      .then(data => setFlaskMsg(data.message));
  }, []);


  const [db_msg, setDbMsg] = useState('');

  useEffect(() => {
    fetch('/api/db/version')
      .then(res => res.json())
      .then(data => setDbMsg(data.version));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Trivial Computers Testing Page</h1>
      <p>&#9989; Frontend UI Subsystem: React Version       = {React.version}</p>
      <p>&#9989; Backend API Subsystem: Flask Version       = {flask_msg}</p>
      <p>&#9989; Database Subsystem:    Postgresql Version  = {db_msg}</p>
    </div>
  );
}

export default App;
