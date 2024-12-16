import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './components/admin/Dashboard';
import QuizCreator from './components/admin/QuizCreator';
import QuizManager from './components/admin/QuizManager';
import UserJoin from './components/user/UserJoin';
import QuizSession from './components/user/QuizSession';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/create" element={<QuizCreator />} />
          <Route path="/admin/quiz/:id" element={<QuizManager />} />
          
          {/* User Routes */}
          <Route path="/" element={<UserJoin />} />
          <Route path="/quiz/:pin" element={<QuizSession />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;