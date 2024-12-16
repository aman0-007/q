import React from 'react';
import { Question } from '../../../../types';
import Timer from '../../../shared/Timer';
import QuestionDisplay from '../../../shared/QuestionDisplay';

interface QuizProgressProps {
  question: Question;
  showAnswers: boolean;
  isLastQuestion: boolean;
  onComplete: () => void;
  onNext: () => void;
}

export default function QuizProgress({ 
  question, 
  showAnswers, 
  isLastQuestion,
  onComplete, 
  onNext 
}: QuizProgressProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <Timer
        duration={25}
        onComplete={onComplete}
      />
      <QuestionDisplay
        question={question}
        showAnswer={showAnswers}
      />
      {showAnswers && (
        <button
          onClick={onNext}
          className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg transition-colors"
        >
          {isLastQuestion ? 'End Quiz' : 'Next Question'}
        </button>
      )}
    </div>
  );
}