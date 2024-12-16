import { create } from 'zustand';
import { Quiz, User, Question } from '../types';

interface QuizStore {
  currentQuiz: Quiz | null;
  users: User[];
  currentQuestion: Question | null;
  answers: Record<string, number>;
  timeRemaining: number;
  setCurrentQuiz: (quiz: Quiz | null) => void;
  addUser: (user: User) => void;
  removeUser: (userId: string) => void;
  updateUserScore: (userId: string, score: number) => void;
  setUsers: (users: User[]) => void;
  setCurrentQuestion: (question: Question | null) => void;
  addAnswer: (userId: string, answer: number) => void;
  setTimeRemaining: (time: number) => void;
  reset: () => void;
}

const initialState = {
  currentQuiz: null,
  users: [],
  currentQuestion: null,
  answers: {},
  timeRemaining: 0,
};

export const useQuizStore = create<QuizStore>((set) => ({
  ...initialState,
  setCurrentQuiz: (quiz) => set({ currentQuiz: quiz }),
  addUser: (user) => set((state) => ({
    users: [...state.users.filter(u => u.id !== user.id), user]
  })),
  removeUser: (userId) => set((state) => ({
    users: state.users.filter(u => u.id !== userId)
  })),
  updateUserScore: (userId, score) => set((state) => ({
    users: state.users.map(user =>
      user.id === userId ? { ...user, score } : user
    )
  })),
  setUsers: (users) => set({ users }),
  setCurrentQuestion: (question) => set({ currentQuestion: question }),
  addAnswer: (userId, answer) => set((state) => ({
    answers: { ...state.answers, [userId]: answer },
  })),
  setTimeRemaining: (time) => set({ timeRemaining: time }),
  reset: () => set(initialState),
}));