import React, { useState } from 'react';
import { ReactComponent as ArrowLeftSvg } from 'assets/images/svg/picto/arrow-left.svg';
import { ReactComponent as UserSvg } from 'assets/svg/user_profile.svg';
import { ReactComponent as PictoFormation } from 'assets/svg/picto_formation.svg';
import { ReactComponent as PictoFiltres } from 'assets/svg/filtres.svg';
import PeintureImg from 'assets/illu/topjob.svg';
import { useHistory } from 'react-router-dom';
import ImmersionSearchFilters from './ImmersionSearchFilters';

export const CardResult = () => {
  const address = '292 RUE CAMILLE GUERIN\n59800 LILLE\n07 XX XX XX XX';

  return (
    <div className="w-full bg-lena-lightgray px-5 py-7 rounded-lg mb-3 focus:ring-0 focus:outline-none text-left space-y-4">
      <div className="flex flex-row justify-end items-end gap-x-2">
        <div className="bg-lena-blue-lightest text-lena-blue-dark rounded-full px-3 py-1 text-center">immersion</div>
        <div className="bg-lena-blue-lightest text-lena-blue-dark rounded-full px-3 py-1 text-center">
          stage en entreprise
        </div>
      </div>
      <div>
        <h3 className="font-bold text-lena-blue-dark">K2M GENIE CLIMATIQUE</h3>
        <p className="text-lena-black text-sm">Travaux d'installation d'eau et de gaz en tous locaux</p>
      </div>
      <div>
        <pre>{address}</pre>
      </div>
      <div className="flex flex-row justify-between">
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-start space-x-2">
            <PictoFormation />
            <div>0 à 49 salariés</div>
          </div>
          <div className="flex items-center justify-start space-x-2">
            <PictoFormation />
            <div>1 km du centre ville</div>
          </div>
        </div>
        <div className="flex items-end text-sm font-bold text-lena-turquoise-dark py-1">Conseils de contact</div>
      </div>
    </div>
  );
};

const ImmersionSearchResults = () => {
  const history = useHistory();
  const [openFilters, setOpenFilters] = useState(false);

  if (openFilters) return <ImmersionSearchFilters onClose={() => setOpenFilters(false)} />;

  return (
    <div>
      <header style={{ background: '#E5E5E5', boxShadow: '0px 4px 4px 0px #00000040' }} className="py-3">
        <div className="container flex justify-between items-center">
          <div className="flex text-sm space-x-2 text-lena-pink-dark" onClick={() => setOpenFilters(true)}>
            <PictoFiltres />
            <span>Filtrer</span>
          </div>
          <div className="text-sm text-lena-pink-dark">Voir sur une carte</div>
          <button className="focus:ring-0 focus:outline-none">
            <UserSvg />
          </button>
        </div>
      </header>
      <div className="mt-3 container mb-5">
        <button onClick={() => history.push('/immersion/recherche')} className="flex items-center space-x-2">
          <ArrowLeftSvg style={{ width: 13, height: 13 }} />
          <span className="mt-1 text-sm text-lena-blue-dark">Modifier ma recherche</span>
        </button>
        <div className="text-lena-blue-dark text-center mt-5 text-lg">
          <strong>TODO</strong> métiers correspondent à votre recherche
        </div>
      </div>
      <div style={{ background: `url(${PeintureImg}) no-repeat fixed`, backgroundSize: 'cover' }}>
        <div className="container py-5">
          <CardResult />
          <CardResult />
          <CardResult />
          <CardResult />
          <CardResult />
          <CardResult />
          <CardResult />
          <CardResult />
          <CardResult />
          <CardResult />
        </div>
      </div>
    </div>
  );
};

export default ImmersionSearchResults;
