import React, { FunctionComponent } from 'react';
import { ReactComponent as LoveTLSvg } from 'assets/svg/love_turquoise_light.svg';

const JobInterestItem: FunctionComponent = () => {
  return (
    <>
      <div className="px-2 py-1 flex items-start space-x-4">
        <LoveTLSvg />
        <div className="mt-1">
          <span className="text-lena-black block">Assurer un transport</span>
          <div className="-mt-1">
            <span className="inline-block rounded-full bg-lena-pink-dark h-2 w-2" />
            <span className="text-lena-pink-dark text-sm ml-2">C'est aussi un de vos centres d'intérêt !</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobInterestItem;
