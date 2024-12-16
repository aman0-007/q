import React from 'react';
import QuizCard from '../quiz-card/QuizCard';
import { Quiz } from '../../../types';

interface QuizListProps {
  quizzes: Quiz[];
}

export default function QuizList({ quizzes }: QuizListProps) {
  if (quizzes.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <p className="text-gray-600">No quizzes found. Create your first quiz to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quizzes.map((quiz) => (
        <QuizCard 
          key={quiz._id || quiz.id}
          quiz={quiz} 
        />
      ))}
    </div>
  );
}