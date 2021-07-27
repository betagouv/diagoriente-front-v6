import React, { FunctionComponent } from 'react';
import { ReactComponent as LoaderBlue } from 'assets/loader-blue.svg';
import { ReactComponent as LoaderYellow } from 'assets/loader-yellow.svg';
import { ReactComponent as LoaderPink } from 'assets/loader-pink.svg';

const AppLoader: FunctionComponent<{ variant?: 'blue' | 'yellow' | 'pink'; text?: string }> = ({
  variant = 'blue',
  text,
}) => {
  return (
    <div className="flex flex-1 flex-col justify-center items-center bg-transparent space-y-4">
      <div>
        {variant === 'blue' && <LoaderBlue />}
        {variant === 'yellow' && <LoaderYellow />}
        {variant === 'pink' && <LoaderPink />}
      </div>
      {text && <div className="text-xl text-lena-black">{text}</div>}
    </div>
  );
};

export default AppLoader;
