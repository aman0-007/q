import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';

const DashboardHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Quiz Dashboard</h1>
        <p className="text-indigo-100">Manage and create your quizzes</p>
      </div>
      <Link
        to="/admin/create"
        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl"
      >
        <PlusCircle size={20} />
        Create New Quiz
      </Link>
    </div>
  );
};

export default DashboardHeader;