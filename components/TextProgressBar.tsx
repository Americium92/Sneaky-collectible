import React from 'react';

interface TextProgressBarProps {
  percentage: number;
}

const TextProgressBar: React.FC<TextProgressBarProps> = ({ percentage }) => {
  const filledCount = Math.round(percentage / 10);
  const emptyCount = 10 - filledCount;
  const filled = '█'.repeat(filledCount);
  const empty = ' '.repeat(emptyCount);

  return (
    <div className="text-left">
      <p className="text-xl text-crt-blue">{`[${filled}${empty}]`}</p>
      <p className="text-2xl font-bold text-crt-blue-dark">{`${Math.round(percentage)}%`}</p>
    </div>
  );
};

export default TextProgressBar;