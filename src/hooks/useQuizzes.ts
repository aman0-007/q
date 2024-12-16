import { useState, useEffect } from 'react';
import { Quiz } from '../types';

export function useQuizzes() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch('/api/quizzes');
        if (!response.ok) {
          throw new Error('Failed to fetch quizzes');
        }
        const data = await response.json();
        setQuizzes(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  return { quizzes, isLoading, error };
}