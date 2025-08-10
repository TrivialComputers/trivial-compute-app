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
  const rollAgain = [0, 8, 72, 80];
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
  const [currentPlayer, setCurrentPlayer] = useState(false);
  const [dice, setDice] = useState(null);
  const [canRoll, setCanRoll] = useState(true);
  const [showQuestion, setShowQuestion] = useState(false);
  const [question, setQuestion] = useState(null);

useEffect(() => {
  const fetchData = () => {
    fetch(`/api/sync?gameId=${JSON.parse(sessionStorage.getItem("game_id"))}`, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(data => {
        if (data.turn === JSON.parse(sessionStorage.getItem("player_number"))) {
          setCurrentPlayer(prev => {
            if (!prev) {
              alert("Your turn!");
              setCanRoll(true);
              return true;
            }
            return prev;
          });
        }
        setPlayers(prevPlayers => {
          const playerMap = new Map(prevPlayers.map(p => [p.name, p]));
          data.names.forEach(newPlayer => {
            playerMap.set(newPlayer.name, newPlayer);
          });
          return Array.from(playerMap.values());
        });
      })
      .catch(err => console.error('Error fetching players:', err));
  };

  fetchData();
  const intervalId = setInterval(fetchData, 1000);

  return () => clearInterval(intervalId);
}, [board, currentPlayer]);

  const rollDice = () => {
    if (!canRoll) {
      alert("You can't roll yet!");
      return;
    }

    setDice(Math.floor(Math.random() * 6) + 1);
    setCanRoll(false);
  };

  const allowRoll = () => {
    setCanRoll(true);
  };

  const movePlayer = (destIndex) => {
    if (Number.isInteger(dice) && dice >= 1 && dice <= 6) {
      const gameId = JSON.parse(sessionStorage.getItem("game_id"));
      const playerNumber = JSON.parse(sessionStorage.getItem("player_number"));

      const updated = [...players];
      const sourceIndex = updated[playerNumber].position;

      const dataToPost = { sourceIndex, destIndex, dice, playerNumber, gameId };

      fetch('/api/move', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToPost),
      })
        .then(async (res) => {
          const data = await res.json();
          if (res.status === 201) {
                updated[playerNumber].position = destIndex;
                setPlayers(updated);
                const cell = board[destIndex];
                if ([0, 8, 72, 80].includes(destIndex)) {
                  alert("Roll again!")
                  setCanRoll(true);
                }
                if (cell?.category !== undefined) {
                  fetch(`/api/question?category=${CATEGORIES[cell.category]}&gameId=${gameId}`)
                    .then(res => res.json())
                    .then(q => { setQuestion(q); setShowQuestion(true); });
                }
          } else {
            console.log("Error:", data.error);
          }
        })
        .catch((err) => console.error("Fetch error:", err));
      }
  };

  const handleAnswer = (answer) => {
    setShowQuestion(false);
    const playerAnswer = answer.trim().toLowerCase();
    const gameId = JSON.parse(sessionStorage.getItem("game_id"));
    const playerNumber = JSON.parse(sessionStorage.getItem("player_number"));
    const playerQuestion = question.question.question

    const dataToPost = {playerAnswer, gameId, playerNumber, playerQuestion}
    fetch('/api/answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToPost),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.status === 201) {
          alert("Correct!")
          setCanRoll(true);
        } else {
          alert("Incorrect!")
          console.log("Error:", data.error);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  };

  return (
    <div className="app-container">
      <header>
        <h1>Trivial Compute</h1>
        <nav>
          <Link to="/">Home</Link>
        </nav>
      </header>
      <Board board={board} players={players} colors={COLORS} onCellClick={movePlayer} />
      <Dice dice={dice} onRoll={rollDice} />
      {showQuestion && <QuestionModal question={question} onAnswer={handleAnswer} />}
    </div>
  );
}

export default App;