import React from 'react';
import { Question } from '../../types';

interface QuestionDisplayProps {
  question: Question;
  showAnswer?: boolean;
}

function QuestionDisplay({ question, showAnswer = false }: QuestionDisplayProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">{question.text}</h3>
      <div className="grid grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border-2 ${
              showAnswer && index === question.correctAnswer
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200'
            }`}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionDisplay;