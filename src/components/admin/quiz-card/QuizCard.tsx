import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Users, Clock, HelpCircle } from 'lucide-react';
import { Quiz } from '../../../types';
import { useQuizStore } from '../../../store/quizStore';

interface QuizCardProps {
  quiz: Quiz;
}

export default function QuizCard({ quiz }: QuizCardProps) {
  const navigate = useNavigate();
  const { setCurrentQuiz } = useQuizStore();

  const handleStartQuiz = () => {
    setCurrentQuiz(quiz);
    navigate(`/admin/quiz/${quiz._id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <h3 className="text-xl font-semibold mb-3">{quiz.title}</h3>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-600">
          <HelpCircle size={18} className="mr-2" />
          <span>{quiz.questions.length} Questions</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Clock size={18} className="mr-2" />
          <span>~{quiz.questions.length * 25} seconds</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Users size={18} className="mr-2" />
          <span>PIN: {quiz.pin}</span>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleStartQuiz}
          className="flex-1 flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Play size={20} />
          Start Quiz
        </button>
      </div>
    </div>
  );
}