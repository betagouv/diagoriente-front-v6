import React from 'react';
import { ReactComponent as ArrowLeftSvg } from 'assets/images/svg/picto/arrow-left.svg';
import { ReactComponent as UserSvg } from 'assets/svg/user_profile.svg';
import PeintureImg from 'assets/illu/topjob.svg';
import { useHistory } from 'react-router-dom';
import { Job } from '../TopJobContainer';

const ListJob = () => {
  const history = useHistory();

  return (
    <div>
      <header style={{ background: '#E5E5E5', boxShadow: '0px 4px 4px 0px #00000040' }} className="py-3">
        <div className="container flex justify-between items-center">
          <div />
          <button className="focus:ring-0 focus:outline-none">
            <UserSvg />
          </button>
        </div>
      </header>
      <div className="mt-3 container mb-5">
        <button onClick={() => history.push('/top_metiers/rechercher')} className="flex items-center space-x-2">
          <ArrowLeftSvg style={{ width: 13, height: 13 }} />
          <span className="mt-1 text-sm text-lena-blue-dark">Modifier ma recherche</span>
        </button>
        <div className="text-lena-blue-dark text-center mt-5 text-lg">
          <strong>12</strong> métiers correspondent à votre recherche
        </div>
      </div>
      <div style={{ background: `url(${PeintureImg}) no-repeat fixed`, backgroundSize: 'cover' }}>
        <div className="container py-5">
          <Job />
          <Job />
          <Job />
          <Job />
          <Job />
          <Job />
          <Job />
          <Job />
          <Job />
          <Job />
        </div>
      </div>
    </div>
  );
};

export default ListJob;
