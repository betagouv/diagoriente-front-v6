import React, { FunctionComponent } from 'react';
import clsx from 'clsx';
import Star from './Star';

export type CardLevelProps = {
  selected: boolean;
  title: React.ReactNode;
  opacity: boolean;
  star: number;
  starReverse?: boolean;
  onSelect?: (e: boolean) => void;
};

const CardLevel: FunctionComponent<CardLevelProps> = ({
  selected = false,
  starReverse = false,
  onSelect,
  star = 1,
  opacity = false,
  children,
  title,
}) => {
  return (
    <div
      onClick={() => onSelect?.call(null, !selected)}
      className={clsx(
        'bg-white mb-2 cursor-pointer rounded-md py-3 px-5 border-2',
        opacity && 'opacity-70',
        selected && !opacity ? 'border-lena-turquoise-dark' : 'border-transparent',
      )}
    >
      <div className="flex items-start">
        <div className="mt-1">
          <div className={clsx('w-4 h-4 mr-3 rounded-full bg-lena-turquoise-dark flex items-center justify-center')}>
            <div
              className={clsx(
                'w-3 h-3 rounded-full border-2 border-white',
                selected ? 'bg-lena-turquoise-dark' : 'bg-white',
              )}
            />
          </div>
        </div>
        <div className="flex-grow">
          <div className="mb-2 flex items-center justify-between flex-grow">
            <div className="flex items-center">{title}</div>
            <div>
              <Star reverse={starReverse} star={star} />
            </div>
          </div>
          <div className="text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default CardLevel;
