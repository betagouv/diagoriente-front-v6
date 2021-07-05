import React, { FunctionComponent, useEffect, useState } from 'react';
import { ReactComponent as SaveMobileSvg } from 'assets/svg/save_mobile.svg';
import SaveSvg from 'assets/svg/save.svg';
import { ReactComponent as JustSaveSvg } from 'assets/svg/just_save.svg';

type Props = {
  isMobile?: boolean;
};

const SaveButtonComponent: FunctionComponent<Props> = ({ isMobile }) => {
  const [visible, setVisible] = useState(false);
  const [isSave, setIsSave] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isSave ? 'hidden' : 'auto';
  }, [isSave]);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.pageYOffset > 50);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  if (isSave) {
    return (
      <div
        className="fixed top-0 bottom-0 left-0 right-0 bg-lena-blue-lightest h-full w-full"
        style={{ zIndex: 9999999 }}
      >
        <div className="mt-40 flex flex-col items-center text-center mx-5">
          <JustSaveSvg />
          <h2 className="text-lena-blue-dark font-bold text-lg mt-4 mb-10">Très bien !</h2>
          <p className="mb-10">
            Vos réponses ont été sauvegardées.
            <br />
            Vous pouvez reprendre à tout moment l’édition de cette expérience dans votre profil.
          </p>
          <button onClick={() => setIsSave(false)} className="text-lena-blue-dark">
            Reprendre maintenant
          </button>
        </div>
      </div>
    );
  }

  if (visible && isMobile) return null;

  return isMobile ? (
    <div className="fixed bottom-0 z-30 right-0 left-0">
      <button
        onClick={() => setIsSave(true)}
        className="flex justify-center items-center p-3 w-full bg-lena-blue-lightest"
        style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
      >
        <SaveMobileSvg />
        <span className="text-lena-blue-dark ml-3 text-right mt-1 text-sm">
          Enregistrer mes réponses et reprendre plus tard
        </span>
      </button>
    </div>
  ) : (
    <button
      onClick={() => setIsSave(true)}
      className="flex items-center bg-lena-blue-lightest px-5 py-2 rounded-lg focus:outline-none focus:ring-0"
    >
      <img src={SaveSvg} alt="Save Icon" />
      <span className="text-left ml-5 font-bold text-lena-blue-dark text-sm mt-1">
        Enregistrer mes réponses et reprendre plus tard
      </span>
    </button>
  );
};

export default SaveButtonComponent;
