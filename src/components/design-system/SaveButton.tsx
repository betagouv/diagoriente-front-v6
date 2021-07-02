import React, { FunctionComponent, useEffect, useState } from 'react';
import { ReactComponent as SaveMobileSvg } from 'assets/svg/save_mobile.svg';
import clsx from 'clsx';

const SaveButtonComponent: FunctionComponent = () => {
  const [visible, setVisible] = useState(false);

  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.pageYOffset > 50);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  if (visible) return null;

  return (
    <div className="fixed bottom-0 z-30 right-0 left-0">
      <button
        className="flex justify-center items-center p-3 w-full bg-lena-blue-lightest"
        style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
      >
        <SaveMobileSvg />
        <span className="text-lena-blue-dark ml-3 text-right mt-1 text-sm">
          Enregistrer mes réponses et reprendre plus tard
        </span>
      </button>
    </div>
  );
};

export default SaveButtonComponent;
