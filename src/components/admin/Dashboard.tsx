import React from 'react';
import QuizList from './QuizList';
import DashboardHeader from './DashboardHeader';
import { useQuizzes } from '../../hooks/useQuizzes';

const AdminDashboard: React.FC = () => {
  const { quizzes, isLoading, error } = useQuizzes();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-red-500">Error loading quizzes. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader />
        <QuizList quizzes={quizzes} />
      </div>
    </div>
  );
};

export default AdminDashboard;