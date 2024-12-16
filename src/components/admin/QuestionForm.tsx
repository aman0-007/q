import React from 'react';
import { Trash2 } from 'lucide-react';
import { Question } from '../../types';

interface QuestionFormProps {
  question: Question;
  onUpdate: (question: Question) => void;
  onDelete: () => void;
}

function QuestionForm({ question, onUpdate, onDelete }: QuestionFormProps) {
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...question.options];
    newOptions[index] = value;
    onUpdate({ ...question, options: newOptions });
  };

  return (
    <div className="border rounded-lg p-6">
      <div className="flex justify-between items-start mb-4">
        <input
          type="text"
          value={question.text}
          onChange={(e) => onUpdate({ ...question, text: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg mr-4"
          placeholder="Enter question text"
        />
        <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-600"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <div key={index} className="flex items-center">
            <input
              type="radio"
              name={`correct-${question.id}`}
              checked={question.correctAnswer === index}
              onChange={() => onUpdate({ ...question, correctAnswer: index })}
              className="mr-2"
            />
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder={`Option ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionForm;