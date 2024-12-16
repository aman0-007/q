import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  text: String,
  options: [String],
  correctAnswer: Number,
});

const QuizSchema = new mongoose.Schema({
  title: String,
  pin: {
    type: String,
    unique: true,
  },
  questions: [QuestionSchema],
  isActive: Boolean,
});

export const Quiz = mongoose.model('Quiz', QuizSchema);