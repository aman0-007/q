import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users } from 'lucide-react';
import { useQuizStore } from '../../../store/quizStore';
import { useQuizSocket } from '../../../hooks/useQuizSocket';
import UserList from '../../shared/UserList';
import QuizControls from './components/QuizControls';
import QuizProgress from './components/QuizProgress';

export default function QuizManager() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentQuiz, setCurrentQuiz, users, reset } = useQuizStore();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [showAnswers, setShowAnswers] = useState(false);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { startQuiz: emitStartQuiz, nextQuestion: emitNextQuestion, endQuiz: emitEndQuiz } = 
    useQuizSocket(currentQuiz?.pin);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!id) {
        setError('Quiz ID is missing');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/quizzes/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const quiz = await response.json();
        setCurrentQuiz(quiz);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching quiz:', error);
        setError('Failed to fetch quiz');
        setIsLoading(false);
      }
    };

    fetchQuiz();
    return () => reset();
  }, [id, setCurrentQuiz, reset]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
      </div>
    );
  }

  if (error || !currentQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <p className="text-red-500 mb-4">{error || 'Quiz not found'}</p>
          <button
            onClick={() => navigate('/admin')}
            className="text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleStartQuiz = () => {
    emitStartQuiz();
    setIsQuizActive(true);
    setCurrentQuestionIndex(0);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setShowAnswers(false);
      emitNextQuestion(nextIndex);
    } else {
      emitEndQuiz();
      setIsQuizActive(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <button
              onClick={() => navigate('/admin')}
              className="flex items-center gap-2 text-white mb-4 hover:text-indigo-200 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Dashboard
            </button>

            {!isQuizActive ? (
              <QuizControls
                quiz={currentQuiz}
                usersCount={users.length}
                onStart={handleStartQuiz}
              />
            ) : (
              <QuizProgress
                question={currentQuiz.questions[currentQuestionIndex]}
                showAnswers={showAnswers}
                isLastQuestion={currentQuestionIndex === currentQuiz.questions.length - 1}
                onComplete={() => setShowAnswers(true)}
                onNext={handleNextQuestion}
              />
            )}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users size={20} />
              <h3 className="text-xl font-semibold">Participants</h3>
              <span className="ml-auto bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-sm">
                {users.length}
              </span>
            </div>
            <UserList users={users} />
          </div>
        </div>
      </div>
    </div>
  );
}