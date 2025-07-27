import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Board from './components/Game/Board';
import StatusBar from './components/Game/StatusBar';
import QuestionModal from './components/Game/QuestionModal';
import Dice from './components/Game/Dice';

const BOARD_SIZE = 9;
const CATEGORIES = ['History', 'Science', 'Arts', 'Sports'];
const COLORS = ['#e74c3c', '#3498db', '#9b59b6', '#2ecc71'];

const generateBoard = () => {
  const total = 45;
  const board = Array(total).fill(null);
  board[Math.floor(total / 2)] = { type: 'center' };
  for (let i = 0; i < 4; i++) {
    const offset = i * BOARD_SIZE;
    for (let j = 1; j < BOARD_SIZE; j++) {
      board[offset + j] = {
        type: j === BOARD_SIZE - 1 ? 'headquarters' : 'path',
        category: i,
        color: COLORS[i],
      };
    }
  }
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
    const count = parseInt(prompt('Enter number of players (1-4):'), 10) || 1;
    const names = [];
    let gameCode = Math.floor(Math.random() * 1000);
    const gameData = {count: count, gameCode: gameCode}
    fetch('/api/game/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gameData),
    });
    for (let i = 0; i < count; i++) {
      names.push({ name: prompt(`Player ${i + 1} name:`) || `Player ${i + 1}`, position: Math.floor(board.length / 2), chips: [] });
      const playerData = {username: names[i].name, position: names[i].position, game_id: gameCode};
      fetch('/api/game/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playerData),
    });
    }
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
    // if (correct) {
    //   const pos = players[currentPlayer].position;
    //   if (board[pos].type === 'headquarters') {
    //     const updated = [...players];
    //     updated[currentPlayer].chips.push(board[pos].category);
    //     setPlayers(updated);
    //   }
    // } else {
    //   setCurrentPlayer((currentPlayer + 1) % players.length);
    // }
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
          <Link to="/">Game</Link>
          <Link to="/editor">Question Editor</Link>
          <Link to="/joinGame">Join Game</Link>
        </nav>
      </header>
      <StatusBar players={players} current={currentPlayer} colors={COLORS} />
      <Board board={board} players={players} colors={COLORS} onCellClick={movePlayer} />
      <Dice dice={dice} onRoll={rollDice} />
      {showQuestion && <QuestionModal question={question} onAnswer={handleAnswer} />}
    </div>
  );
}

export default App;
