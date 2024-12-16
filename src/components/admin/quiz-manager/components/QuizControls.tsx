import React from 'react';
import { Play } from 'lucide-react';
import { Quiz } from '../../../../types';

interface QuizControlsProps {
  quiz: Quiz;
  usersCount: number;
  onStart: () => void;
}

export default function QuizControls({ quiz, usersCount, onStart }: QuizControlsProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{quiz.title}</h2>
      <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-6">
        <p className="text-lg font-semibold text-indigo-900">Quiz PIN: {quiz.pin}</p>
        <p className="text-sm text-indigo-600 mt-1">
          Share this PIN with your participants to join
        </p>
      </div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">
          {usersCount} participant{usersCount !== 1 ? 's' : ''} joined
        </p>
        <button
          onClick={onStart}
          disabled={usersCount === 0}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play size={20} />
          Start Quiz
        </button>
      </div>
    </div>
  );
}