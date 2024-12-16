export interface IQuestion {
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface IQuiz {
  title: string;
  pin: string;
  questions: IQuestion[];
  isActive: boolean;
}

export interface IUser {
  id: string;
  name: string;
  avatar: string;
  score: number;
}