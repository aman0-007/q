import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';

const AVATARS = [
  '🦁', '🐯', '🐻', '🐨', '🐼', '🐸', '🐵', '🦊'
];

function UserJoin() {
  const [pin, setPin] = useState('');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const navigate = useNavigate();

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin && name && avatar) {
      navigate(`/quiz/${pin}`, { state: { name, avatar } });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">Join Quiz</h1>
        
        <form onSubmit={handleJoin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quiz PIN
            </label>
            <input
              type="text"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter quiz PIN"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose Avatar
            </label>
            <div className="grid grid-cols-4 gap-4">
              {AVATARS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setAvatar(emoji)}
                  className={`text-3xl p-2 rounded-lg ${
                    avatar === emoji ? 'bg-indigo-100 ring-2 ring-indigo-500' : 'hover:bg-gray-100'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg transition-colors"
          >
            Join Quiz
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserJoin;