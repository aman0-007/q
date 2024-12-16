import { socket } from '../utils/socket';
import { User, Quiz } from '../types';

type SocketCallback = (...args: any[]) => void;

class SocketService {
  private listeners: Map<string, SocketCallback[]> = new Map();

  constructor() {
    // Ensure socket connection
    if (!socket.connected) {
      socket.connect();
    }

    // Handle reconnection
    socket.on('reconnect', () => {
      console.log('Socket reconnected');
      this.rejoinRooms();
    });
  }

  private rooms: Set<string> = new Set();

  private rejoinRooms() {
    this.rooms.forEach(pin => {
      socket.emit('admin-join', pin);
    });
  }

  joinQuizAsAdmin(pin: string) {
    this.rooms.add(pin);
    socket.emit('admin-join', pin);
  }

  leaveQuiz(pin: string) {
    this.rooms.delete(pin);
    socket.emit('leave-quiz', pin);
  }

  onUserJoined(callback: (user: User) => void) {
    this.addListener('user-joined', callback);
    socket.on('user-joined', callback);
  }

  onUserLeft(callback: (userId: string) => void) {
    this.addListener('user-left', callback);
    socket.on('user-left', callback);
  }

  onAnswerSubmitted(callback: (data: { userId: string; answer: number; score: number }) => void) {
    this.addListener('answer-submitted', callback);
    socket.on('answer-submitted', callback);
  }

  startQuiz(pin: string) {
    socket.emit('start-quiz', pin);
  }

  nextQuestion(pin: string, questionIndex: number) {
    socket.emit('next-question', { pin, questionIndex });
  }

  endQuiz(pin: string) {
    socket.emit('end-quiz', pin);
  }

  private addListener(event: string, callback: SocketCallback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)?.push(callback);
  }

  cleanup() {
    this.listeners.forEach((callbacks, event) => {
      callbacks.forEach(callback => {
        socket.off(event, callback);
      });
    });
    this.listeners.clear();
    this.rooms.clear();
  }
}

export const socketService = new SocketService();