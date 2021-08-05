import React, { FunctionComponent, useState } from 'react';
import PictoExperience from 'assets/svg/star.svg';
import PictoInterests from 'assets/svg/heart.svg';
import PictoPlaceholder from 'assets/svg/cross3.svg';
import { Link } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import LogoDiagoriente from '../assets/images/logo/diagoriente.svg';
import RepubliqueSvg from '../assets/images/logo/republique.svg';
import LogoBetagouv from '../assets/images/logo/betagouv.svg';

const AppDrawer: FunctionComponent<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const links = [
    { label: 'Ajouter une expérience', icon: PictoExperience, link: '/experience' },
    { label: "Ajouter mes centres d'intérêt", icon: PictoInterests, link: '/interests/create' },
    { label: 'Rechercher engagement', icon: PictoPlaceholder, link: '/immersion/recherche' },
    { label: 'Rechercher métier', icon: PictoPlaceholder, link: '/metiers/recherche' },
  ];

  return (
    <>
      {showOverlay && (
        <div
          className="fixed top-0 right-0 bottom-0 left-0 bg-lena-blue-dark bg-opacity-80 z-40"
          onClick={() => onClose?.()}
        />
      )}

      <Transition
        show={open}
        className="w-4/5 bg-white absolute top-0 h-screen flex flex-col shadow-xl z-50"
        enter="transform duration-150"
        enterFrom="-translate-x-full"
        enterTo="-translate-x-0"
        leave="transform duration-150"
        leaveFrom="-translate-x-0"
        leaveTo="-translate-x-full"
        beforeEnter={() => setShowOverlay(true)}
        afterLeave={() => setShowOverlay(false)}
      >
        <div className="px-8 flex flex-col divide divide-y divide-lena-lightgray2">
          <div className="flex flex-col justify-center space-y-2 py-8">
            <Link to="/">
              <img src={LogoDiagoriente} alt="Logo de Diagoriente" style={{ width: 155, height: 37 }} />
            </Link>
            <div className="flex items-center space-x-4">
              <img src={RepubliqueSvg} alt="Logo de la République Française" style={{ width: 68, height: 36 }} />
              <img src={LogoBetagouv} alt="Logo de Beta.gouv.fr" style={{ width: 80, height: 14 }} />
            </div>
          </div>
          <div className="py-8 space-y-4">
            {links.map((v) => (
              <div key={v.label} className="flex flex-row items-center space-x-4 text-lena-blue-dark">
                {v.icon && <img src={v.icon} alt={v.label} height={16} width={16} />}
                <Link to={v.link}>{v.label}</Link>
              </div>
            ))}
          </div>
        </div>
      </Transition>
    </>
  );
};

export default AppDrawer;
