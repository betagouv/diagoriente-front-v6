import React, { FunctionComponent, useContext } from 'react';
import { ReactComponent as UserProfileIcon } from 'assets/svg/user_profile.svg';
import ProgressBar from 'components/design-system/ProgressBar';
import { EParcoursStep, NewExperienceContext } from 'contexts/NewExperienceContext';
import clsx from 'clsx';

type Props = {
  withRange?: boolean;
  backgroundColor?: string;
};

const ParcoursLayoutForMobile: FunctionComponent<Props> = ({ withRange, backgroundColor, children }) => {
  const { step } = useContext(NewExperienceContext);

  return (
    <div className="min-h-screen h-full flex flex-col">
      <div className="sticky top-0 shadow-md z-50">
        {!withRange ? (
          <>
            <ProgressBar value={step} maxValue={Object.keys(EParcoursStep).length / 2 - 1} />
            <div className="p-2 bg-lena-lightgray flex flex-row items-center justify-between">
              <div className="text-lena-blue-dark font-bold uppercase">Centres d'intérêts</div>
              <UserProfileIcon />
            </div>
          </>
        ) : (
          <div>
            <div className="flex justify-between py-2 px-3 bg-lena-yellow-light">
              <span className="text-lena-blue-dark font-bold">Travail collectif</span>
              <span className="text-lena-blue-dark font-bold">Travail individuel</span>
            </div>
            <div>
              <div className="bg-lena-blue-alt-light h-5">
                <div className="h-full flex justify-around relative">
                  <div className="bg-lena-blue-dark bg-opacity-20 w-5 h-full" />
                  <div className="bg-lena-blue-dark bg-opacity-20 w-5 h-full" />
                  <div className="bg-lena-blue-dark bg-opacity-20 w-5 h-full" />
                  <div className="bg-lena-blue-dark bg-opacity-20 w-5 h-full" />
                  <div className="bg-lena-blue-dark bg-opacity-20 w-5 h-full" />
                  <div className="absolute" style={{ height: 25, top: -5 }}>
                    <div className="bg-lena-yellow-dark h-full w-5 rounded-t-lg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        className={clsx(
          'flex flex-col items-center justify-start flex-1',
          backgroundColor === 'yellow' && 'bg-lena-yellow-light',
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default ParcoursLayoutForMobile;
