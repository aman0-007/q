import { useEffect } from 'react';
import { socketService } from '../services/socketService';
import { useQuizStore } from '../store/quizStore';

export const useQuizSocket = (pin: string | undefined) => {
  const { addUser, removeUser, updateUserScore } = useQuizStore();

  useEffect(() => {
    if (!pin) return;

    // Join as admin
    socketService.joinQuizAsAdmin(pin);

    // Set up event listeners
    socketService.onUserJoined((user) => {
      console.log('User joined:', user);
      addUser(user);
    });

    socketService.onUserLeft((userId) => {
      console.log('User left:', userId);
      removeUser(userId);
    });

    socketService.onAnswerSubmitted(({ userId, score }) => {
      updateUserScore(userId, score);
    });

    // Cleanup
    return () => {
      socketService.leaveQuiz(pin);
      socketService.cleanup();
    };
  }, [pin, addUser, removeUser, updateUserScore]);

  return {
    startQuiz: () => socketService.startQuiz(pin!),
    nextQuestion: (questionIndex: number) => socketService.nextQuestion(pin!, questionIndex),
    endQuiz: () => socketService.endQuiz(pin!),
  };
};