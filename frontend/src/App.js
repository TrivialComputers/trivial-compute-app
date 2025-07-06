import React, { useEffect, useState } from 'react';

function App() {
  const [flask_msg, setFlaskMsg] = useState('');
  const [db_msg, setDbMsg] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const [flaskResponse, setFlaskResponse] = useState('');
  const [dbResponse, setDbResponse] = useState('');

  useEffect(() => {
    fetch('/api/version')
      .then(res => res.json())
      .then(data => setFlaskMsg(data.message))
      .catch(err => console.error('Error fetching Flask version:', err));
  }, []);

  useEffect(() => {
    fetch('/api/db/version')
      .then(res => res.json())
      .then(data => setDbMsg(data.version))
      .catch(err => console.error('Error fetching DB version:', err));
  }, []);

  const handleFlaskTestApiCall = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/uptime');
      const data = await res.json();
      setFlaskResponse(data.uptime);
    } catch (err) {
      console.error(err);
      setFlaskResponse('Error connecting to /api/uptime of Flask endpoint');
    } finally {
      setLoading(false);
    }
  };

  const handleDbTestApiCall = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/db/uptime');
      const data = await res.json();
      setDbResponse(data.uptime);
    } catch (err) {
      console.error(err);
      setDbResponse('Error connecting to /api/db/test of Flask endpoint');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Trivial Computers Testing Page</h1>
      <h2>&#9989; Frontend UI Subsystem: </h2>
      <p>React Version       = {React.version}</p>
      <h2>&#9989; Backend API Subsystem: </h2>
      <p>Flask Version       = {flask_msg}</p>
      <button onClick={handleFlaskTestApiCall} disabled={loading}>
        {loading ? 'Loading...' : 'Query Flask Uptime'}
      </button>
      <p>{flaskResponse}</p>
      <h2>&#9989; Database Subsystem:</h2>
      <p>Postgresql Version  = {db_msg}</p>
      <button onClick={handleDbTestApiCall} disabled={loading}>
        {loading ? 'Loading...' : 'Query Database Uptime'}
      </button>
      <p>{dbResponse}</p>
    </div>
  );
}

export default App;
