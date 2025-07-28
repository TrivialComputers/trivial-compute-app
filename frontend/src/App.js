import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Board from './components/Game/Board';
// import StatusBar from './components/Game/StatusBar';
import QuestionModal from './components/Game/QuestionModal';
import Dice from './components/Game/Dice';

const BOARD_SIZE = 9;
const CATEGORIES = ['History', 'Science', 'Arts', 'Sports'];
const COLORS = ['#e74c3c', '#3498db', '#9b59b6', '#2ecc71'];

const generateBoard = () => {
  const total = 81;
  const board = Array(total).fill(null);
  
  const centerPosition = 40;
  const hqPositions = [4, 36, 44, 76];
  const excluded = [0, 4, 8, 36, 44, 72, 76, 80];
  const qPositions = Array.from({ length: 81 }, (_, i) => i + 1)
  .filter(n => !excluded.includes(n));
  board[centerPosition] = { type: 'center' };
  
  hqPositions.forEach((pos, index) => {
    board[pos] = { type: 'headquarters', category: index, color: COLORS[index] };
  });
  
  qPositions.forEach((pos, index) => {
    board[pos] = { type: 'question', category: index % 4, color: COLORS[index % 4] };
  });

  return board;
};

function App() {
  const [board] = useState(generateBoard());
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [dice, setDice] = useState(1);
  const [showQuestion, setShowQuestion] = useState(false);
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    const names = [];
    const gameId = window.location.pathname.split('/').filter(Boolean).pop();

    fetch(`/api/get_players?gameId=${gameId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        names.push(...data);
        console.log(names);
      })
      .catch(err => console.error('Error fetching players:', err));
    
    names.push({ name: "testUser", position: 4, chips: [] })
    setPlayers(names);
  }, [board]);

  const rollDice = () => setDice(Math.floor(Math.random() * 6) + 1);

  const movePlayer = (destIndex) => {
    const updated = [...players];
    const sourceIndex = updated[currentPlayer].position;
    updated[currentPlayer].position = destIndex;
    setPlayers(updated);

    const dataToPost = { sourceIndex, destIndex };

    fetch('/api/move', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToPost),
    });
    
    const cell = board[destIndex];
    if (cell?.category !== undefined) {
      fetch(`/api/question?category=${CATEGORIES[cell.category]}`)
        .then(res => res.json())
        .then(q => { setQuestion(q); setShowQuestion(true); });
    }
  };

  const handleAnswer = (answer) => {
    setShowQuestion(false);
    const isCorrect = answer.trim().toLowerCase() === question.question.answer.trim().toLowerCase();
    if (isCorrect) {
      alert("Correct!");
    } else {
      alert("Incorrect!");
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Trivial Compute</h1>
        <nav>
          <Link to="/">Sign In</Link>
          <Link to="/editor">Question Editor</Link>
          <Link to="/yourGame">Game</Link>
        </nav>
      </header>
      <Board board={board} players={players} colors={COLORS} onCellClick={movePlayer} />
      <Dice dice={dice} onRoll={rollDice} />
      {showQuestion && <QuestionModal question={question} onAnswer={handleAnswer} />}
    </div>
  );
}

export default App;