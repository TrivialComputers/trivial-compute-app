import React, { useEffect, useState } from 'react';

function App() {
  const [flask_msg, setFlaskMsg] = useState('');

  useEffect(() => {
    fetch('/api/flask_test')
      .then(res => res.json())
      .then(data => setFlaskMsg(data.message));
  }, []);


  const [db_msg, setDbMsg] = useState('');

  useEffect(() => {
    fetch('/api/db_test')
      .then(res => res.json())
      .then(data => setDbMsg(data.version));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Trivial Computers Testing Page</h1>
      <p>Flask Test says: {flask_msg}</p>
      <p>Postgresql Version: {db_msg}</p>
    </div>
  );
}

export default App;
