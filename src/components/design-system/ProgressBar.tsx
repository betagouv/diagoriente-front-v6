import React, { FunctionComponent, useMemo } from 'react';

export type ProgressBarProps = {
  value: number;
  maxValue?: number;
};

const ProgressBar: FunctionComponent<ProgressBarProps> = ({ value = 0, maxValue = 100 }) => {
  const percentage = useMemo(() => {
    return Math.max(0, Math.min(100, (100 * value) / maxValue));
  }, [value, maxValue]);

  return (
    <div className="h-2 bg-lena-blue-alt-light w-full">
      <div className="bg-lena-blue h-full" style={{ width: `${percentage}%` }} />
    </div>
  );
};

export default ProgressBar;
