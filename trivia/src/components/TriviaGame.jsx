import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TriviaGame() {
  const [triviaQuestions, setTriviaQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    axios.get('https://the-trivia-api.com/api/questions?limit=10')
      .then((response) => {
        setTriviaQuestions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching trivia questions:', error);
      });
  }, []);

  if (triviaQuestions.length === 0) {
    return <p>Loading trivia questions...</p>;
  }

  const currentQuestion = triviaQuestions[currentQuestionIndex];

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1); // Increment score
    }

    if (currentQuestionIndex < triviaQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to next question
    } else {
      console.log('Game over!'); // Handle end of game
    }
  };

  return (
    <div>
      <h1>Trivia Game</h1>
      <p>Category: {currentQuestion.category}</p>
      <p>Question: {currentQuestion.question}</p>
      <div>
        {currentQuestion.incorrect_answers.map((answer, index) => (
          <button key={index} onClick={() => handleAnswer(false)}>
            {answer}
          </button>
        ))}
        <button onClick={() => handleAnswer(true)}>
          {currentQuestion.correct_answer}
        </button>
      </div>
      <p>Score: {score}</p> {/* Display score */}
    </div>
  );
}

export default TriviaGame;
