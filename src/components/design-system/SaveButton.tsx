import React, { FunctionComponent, useEffect, useState } from 'react';
import { ReactComponent as SaveMobileSvg } from 'assets/svg/save_mobile.svg';
import clsx from 'clsx';

type SaveButton = {
  position: 'left' | 'right';
};

const SaveButtonComponent: FunctionComponent<SaveButton> = ({ position }) => {
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

  return (
    <div className={clsx('fixed bottom-16 z-30', position === 'left' && 'left-5', position === 'right' && 'right-5')}>
      <button
        className={clsx(
          'flex justify-center items-center rounded-full p-3 transition duration-500',
          !visible ? 'bg-white' : 'bg-lena-blue-lightest',
        )}
        style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
      >
        {!visible && (
          <span className="text-lena-blue-dark font-bold mr-3 text-right mt-1 text-sm">Enregistrer mes réponses</span>
        )}
        <SaveMobileSvg />
      </button>
    </div>
  );
};

export default SaveButtonComponent;
