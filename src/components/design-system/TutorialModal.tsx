import React, { FunctionComponent } from 'react';
import { ReactComponent as CrossIcon } from 'assets/svg/cross3_white.svg';
import classNames from 'common/utils/classNames';

const TutorialModal: FunctionComponent = () => {
  const dot = (active: boolean = false) => {
    return (
      <div className={classNames('cursor-pointer rounded-full w-2 h-2', active ? 'bg-white' : 'bg-lena-blue-inter')} />
    );
  };

  return (
    <div className="relative bg-lena-blue-dark font-bold text-white w-96 p-8">
      <div className="flex flex-col space-y-2">
        <div className="flex flex-row items-center justify-center">
          <div className="space-y-1">
            <div>Tutoriel 1/3</div>
            <div className="flex space-x-1 items-center justify-center">
              {dot(true)}
              {dot(false)}
              {dot(false)}
            </div>
          </div>
        </div>
        <div className="py-4 text-center">
          Accusamus alias corporis delectus distinctio dolores dolorum eligendi est et eveniet incidunt ipsa laborum,
          nulla odio quia quidem quis sequi, tempora vel!
        </div>
      </div>
      <div
        className={classNames(
          'absolute -bottom-4 right-0 left-0 text-center bg-lena-blue px-4 py-2 text-lg cursor-pointer',
          'hover:bg-lena-blue-alt-dark focus:ring-0 focus:outline-none',
        )}
      >
        Suivant
      </div>
      <div className="absolute top-8 right-8">
        <CrossIcon />
      </div>
    </div>
  );
};

export default TutorialModal;
