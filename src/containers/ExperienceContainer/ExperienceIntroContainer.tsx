import AppLayout from 'layouts/AppLayout/AppLayout';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'common/utils/classNames';

const ExperienceIntroContainer: FunctionComponent = () => {
  return (
    <AppLayout>
      <div className="flex flex-1 items-center justify-center px-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[0, 1, 2, 3].map((v) => (
            <Link key={v} to="/">
              <div
                className={classNames(
                  'bg-lena-blue-dark font-bold text-xl text-white px-2 py-16 text-center space-y-2',
                  'md:py-64 md:hover:bg-lena-blue-alt-dark',
                )}
              >
                <div className="text-lena-turquoise-dark">icon</div>
                <div>Expérience professionnelle</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default ExperienceIntroContainer;
