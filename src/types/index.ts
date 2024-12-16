export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Quiz {
  _id?: string; // MongoDB ID
  id?: string;  // Fallback ID
  title: string;
  pin: string;
  questions: Question[];
  isActive: boolean;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  score: number;
}

export interface Answer {
  userId: string;
  questionId: string;
  selectedOption: number;
  timeToAnswer: number;
}