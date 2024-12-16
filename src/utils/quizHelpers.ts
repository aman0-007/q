export const calculateQuizDuration = (questionCount: number) => {
  const questionDisplayTime = 10; // seconds
  const answerTime = 15; // seconds
  return questionCount * (questionDisplayTime + answerTime);
};

export const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};