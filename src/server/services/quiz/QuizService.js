class QuizService {
  constructor() {
    this.activeQuizzes = new Map();
    this.adminSockets = new Map();
  }

  addUser(pin, socket, userData) {
    const user = {
      id: socket.id,
      name: userData.name,
      avatar: userData.avatar,
      score: 0
    };

    if (!this.activeQuizzes.has(pin)) {
      this.activeQuizzes.set(pin, new Map());
    }
    
    this.activeQuizzes.get(pin).set(socket.id, user);
    return user;
  }

  removeUser(socketId) {
    let removedFrom = null;
    this.activeQuizzes.forEach((users, pin) => {
      if (users.has(socketId)) {
        users.delete(socketId);
        removedFrom = pin;
      }
    });
    return removedFrom;
  }

  getQuizUsers(pin) {
    return Array.from(this.activeQuizzes.get(pin)?.values() || []);
  }

  updateUserScore(pin, socketId, score) {
    const users = this.activeQuizzes.get(pin);
    const user = users?.get(socketId);
    if (user) {
      user.score = score;
      return user;
    }
    return null;
  }

  setAdminSocket(pin, socket) {
    this.adminSockets.set(pin, socket);
  }

  removeAdminSocket(pin) {
    this.adminSockets.delete(pin);
  }

  getAdminSocket(pin) {
    return this.adminSockets.get(pin);
  }
}

export const quizService = new QuizService();