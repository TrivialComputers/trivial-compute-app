import React, { useState } from 'react';

export default function QuestionModal({ question, onAnswer }) {
  const [userAnswer, setUserAnswer] = useState('');

  const handleSubmit = () => {
    onAnswer(userAnswer);
    setUserAnswer('');
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{question.question.question}</h2>
        {question.media && <img src={question.media} alt="Question media" />}

        <div className="answer-input">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type your answer here..."
          />
          <button onClick={handleSubmit}>Submit Answer</button>
        </div>
      </div>
    </div>
  );
}
