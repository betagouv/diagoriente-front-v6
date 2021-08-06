import React, { FunctionComponent, useMemo } from 'react';
import classNames from 'common/utils/classNames';

export type ProgressBarProps = {
  color?: string;
  value: number;
  maxValue?: number;
};

const ProgressBar: FunctionComponent<ProgressBarProps> = ({ color, value = 0, maxValue = 100 }) => {
  const percentage = useMemo(() => {
    return Math.max(0, Math.min(100, (100 * value) / maxValue));
  }, [value, maxValue]);

  return (
    <div className="h-2 bg-lena-blue-alt-light w-full">
      <div className={classNames('h-full', color || 'bg-lena-blue')} style={{ width: `${percentage}%` }} />
    </div>
  );
};

export default ProgressBar;
