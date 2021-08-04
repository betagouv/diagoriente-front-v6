import React, { FunctionComponent, useState, useRef } from 'react';
import classNames from 'common/utils/classNames';

export interface CodeFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CodeField: FunctionComponent<CodeFieldProps> = ({ value, onChange }) => {
  const [focused, setFocused] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  return (
    <div
      onClick={() => {
        input.current?.focus();
      }}
      className={classNames(
        'w-full border flex h-12 rounded-md border-lena-lightgray2 bg-white overflow-hidden relative',
        focused && 'border-lena-gray',
      )}
    >
      {[...Array(6)].map((v, index) => {
        return (
          <div
            // eslint-disable-next-line
            key={index}
            className={classNames(
              'flex-1 flex items-center text-base justify-center border-lena-lightgray2',
              index !== 5 && 'border-r',
              index === 0 && 'rounded-l-md',
              index === 5 && 'rounded-r-md',
              focused && (index === value.length || index === value.length - 1) && 'border-lena-gray',
              focused && index === value.length && 'bg-gray-200',
            )}
          >
            {value[index]}
          </div>
        );
      })}
      <input
        maxLength={6}
        ref={input}
        className="absolute top-0 left-0 w-full h-full opacity-0"
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
};

export default CodeField;
