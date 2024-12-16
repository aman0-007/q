import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useQuizStore } from '../../store/quizStore';
import QuestionDisplay from '../shared/QuestionDisplay';
import Timer from '../shared/Timer';
import { socket } from '../../utils/socket';

function QuizSession() {
  const { pin } = useParams();
  const location = useLocation();
  const { currentQuestion, setCurrentQuestion } = useQuizStore();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    socket.emit('join-quiz', pin, location.state);

    socket.on('question', (question) => {
      setCurrentQuestion(question);
      setSelectedAnswer(null);
    });

    socket.on('score-update', (newScore) => {
      setScore(newScore);
    });

    return () => {
      socket.off('question');
      socket.off('score-update');
    };
  }, [pin]);

  const handleAnswer = (index: number) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(index);
      socket.emit('submit-answer', {
        pin,
        questionId: currentQuestion?.id,
        answer: index,
      });
    }
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Waiting for quiz to start...</h2>
          <p className="text-gray-600">The host will start the quiz soon</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <Timer duration={15} onComplete={() => {}} />
          <div className="text-xl font-semibold">Score: {score}</div>
        </div>

        <QuestionDisplay question={currentQuestion} />

        <div className="grid grid-cols-2 gap-4 mt-6">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={selectedAnswer !== null}
              className={`p-4 rounded-lg text-center transition-colors ${
                selectedAnswer === index
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuizSession;