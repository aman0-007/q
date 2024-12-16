import React, { useEffect, useState } from 'react';

interface TimerProps {
  duration: number;
  onComplete: () => void;
}

function Timer({ duration, onComplete }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft === 0) {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

  const progress = (timeLeft / duration) * 100;

  return (
    <div className="w-20 h-20 relative mb-4">
      <svg className="w-full h-full" viewBox="0 0 36 36">
        <path
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#eee"
          strokeWidth="3"
        />
        <path
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#4f46e5"
          strokeWidth="3"
          strokeDasharray={`${progress}, 100`}
        />
        <text x="18" y="20.35" className="text-5xl" textAnchor="middle">
          {timeLeft}
        </text>
      </svg>
    </div>
  );
}

export default Timer;