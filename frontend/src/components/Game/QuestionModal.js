import React from 'react';

export default function QuestionModal({ question, onAnswer }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{question.text}</h2>
        {question.media && <img src={question.media} alt="Question media" />}
        <div className="options">
          {question.choices.map((choice, idx) => (
            <button key={idx} onClick={() => onAnswer(choice.correct)}>{choice.text}</button>
          ))}
        </div>
      </div>
    </div>
  );
}