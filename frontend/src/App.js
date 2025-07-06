import React, { useEffect, useState } from 'react';

function App() {
  const [flask_msg, setFlaskMsg] = useState('');
  const [db_msg, setDbMsg] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const [flaskResponse, setFlaskResponse] = useState('');
  const [dbResponse, setDbResponse] = useState('');

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState('');

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
  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/messages');
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error('Failed to fetch messages:', err);
      setStatus('Error fetching messages');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('Message sent!');
        setMessage('');
        fetchMessages(); // refresh the list
      } else {
        setStatus(data.error || 'Failed to send message');
      }
    } catch (err) {
      console.error('Failed to send message:', err);
      setStatus('Error sending message');
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

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
      <p>Send Message to Database</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ padding: '0.5rem', width: '60%' }}
        />
        <button type="submit" style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}>
          Send
        </button>
      </form>
      <p>Database Messages</p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {messages.map((msg) => (
          <li key={msg.id} style={{ borderBottom: '1px solid #ccc', padding: '0.5rem 0' }}>
            <strong>#{msg.id}</strong>: {msg.message}
            <br />
            <small style={{ color: 'gray' }}>{new Date(msg.timestamp).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
