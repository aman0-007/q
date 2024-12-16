import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Save } from 'lucide-react';
import QuestionForm from './QuestionForm';
import { Question } from '../../types';
import { generatePin } from '../../utils/pinGenerator';

function QuizCreator() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);

  const handleSave = async () => {
    const pin = generatePin();
    const quiz = {
      title,
      pin,
      questions,
      isActive: false,
    };

    try {
      const response = await fetch('/api/quizzes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quiz),
      });
      const data = await response.json();
      navigate('/admin');
    } catch (error) {
      console.error('Failed to create quiz:', error);
    }
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      text: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
    };
    setQuestions([...questions, newQuestion]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6">Create New Quiz</h1>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quiz Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter quiz title"
          />
        </div>

        <div className="space-y-6">
          {questions.map((question, index) => (
            <QuestionForm
              key={question.id}
              question={question}
              onUpdate={(updatedQuestion) => {
                const newQuestions = [...questions];
                newQuestions[index] = updatedQuestion;
                setQuestions(newQuestions);
              }}
              onDelete={() => {
                setQuestions(questions.filter(q => q.id !== question.id));
              }}
            />
          ))}
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={addQuestion}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            <Plus size={20} />
            Add Question
          </button>
          <button
            onClick={handleSave}
            disabled={!title || questions.length === 0}
            className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            <Save size={20} />
            Save Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizCreator;