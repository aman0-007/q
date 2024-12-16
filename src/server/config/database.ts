import mongoose from 'mongoose';

export const connectDatabase = async () => {
  try {
    await mongoose.connect('mongodb+srv://aman:Aman007@cluster0.m5lef.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};