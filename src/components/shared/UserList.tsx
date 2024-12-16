import React from 'react';
import { User } from '../../types';

interface UserListProps {
  users: User[];
}

function UserList({ users }: UserListProps) {
  if (users.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        <p>Waiting for participants to join...</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-[400px] overflow-y-auto">
      {users.map(user => (
        <div
          key={user.id}
          className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <span className="text-2xl">{user.avatar}</span>
          <div className="flex-1">
            <span className="font-medium text-gray-900">{user.name}</span>
            {user.score !== undefined && (
              <span className="ml-2 text-sm text-gray-500">Score: {user.score}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserList;