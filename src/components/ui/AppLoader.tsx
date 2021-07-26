import React, { FunctionComponent } from 'react';
import { ReactComponent as LoaderBlue } from 'assets/loader-blue.svg';
import { ReactComponent as LoaderYellow } from 'assets/loader-yellow.svg';
import { ReactComponent as LoaderPink } from 'assets/loader-pink.svg';

const AppLoader: FunctionComponent<{ variant?: 'blue' | 'yellow' | 'pink' }> = ({ variant = 'blue' }) => {
  return (
    <div className="flex flex-1 justify-center items-center bg-transparent">
      {variant === 'blue' && <LoaderBlue />}
      {variant === 'yellow' && <LoaderYellow />}
      {variant === 'pink' && <LoaderPink />}
    </div>
  );
};

export default AppLoader;
