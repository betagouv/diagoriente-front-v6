import React, { FunctionComponent } from 'react';
import clsx from 'clsx';
import Star from './Star';

export type CardLevelProps = {
  selected: boolean;
  text_normal: string;
  text_bold: string;
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
  text_normal,
  text_bold,
  opacity = false,
  children,
}) => {
  return (
    <div
      onClick={() => onSelect?.call(null, !selected)}
      className={clsx(
        'bg-white mb-2 cursor-pointer rounded-md py-3 px-5',
        opacity && 'opacity-70',
        selected && !opacity && 'border-2 border-lena-turquoise-dark',
      )}
    >
      <div className="flex items-start">
        <div className="mt-1">
          <div className={clsx('w-4 h-4 mr-3 rounded-full bg-lena-turquoise-dark flex items-center justify-center')}>
            {selected ? (
              <div className={clsx('w-3 h-3 rounded-full bg-lena-turquoise-dark border-2 border-white')} />
            ) : (
              <div className={clsx('w-3 h-3 rounded-full bg-white border-2 border-white')} />
            )}
          </div>
        </div>
        <div className="flex-grow">
          <div className="mb-2 flex items-center justify-between flex-grow">
            <div className="flex items-center">
              <span>
                {text_normal} <strong>{text_bold}</strong>
              </span>
            </div>
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
