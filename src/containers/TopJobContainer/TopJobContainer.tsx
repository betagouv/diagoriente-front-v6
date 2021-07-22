import React, { FunctionComponent } from 'react';
import { ReactComponent as SearchSvg } from 'assets/svg/search.svg';
import { ReactComponent as UserSvg } from 'assets/svg/user_profile.svg';
import { ReactComponent as TopJobSvg } from 'assets/svg/top_job.svg';
import { ReactComponent as InfoSvg } from 'assets/svg/info.svg';
import PeintureImg from 'assets/illu/topjob.svg';
import { useHistory } from 'react-router-dom';

// TODO remove default and use ids from DB
export const CardJob: FunctionComponent<{ jobId?: string }> = ({ jobId = 'djs54sdf41dsf213' }) => {
  const history = useHistory();

  return (
    <button
      onClick={() => history.push(`/metiers/${jobId}`)}
      className="bg-lena-lightgray px-5 py-7 rounded-lg mb-3 focus:ring-0 focus:outline-none text-left"
    >
      <h3 style={{ color: '#424242' }} className="font-bold mb-1">
        Technicien/ne démonstrateur/trice en matériel agricole
      </h3>
      <p className="text-lena-black mb-5 text-sm">
        Qu'il représente une ou plusieurs marques, le technicien démonstrateur en matériel agricole...
      </p>
      <span className="bg-lena-blue-alt-light rounded-full font-bold text-sm py-2 px-3">DEUG, BTS, DUT</span>
    </button>
  );
};

const TopJobContainer = () => {
  const history = useHistory();

  return (
    <div>
      <header style={{ background: '#E5E5E5', boxShadow: '0px 4px 4px 0px #00000040' }} className="py-3">
        <div className="container flex justify-between items-center">
          <button
            className="focus:ring-0 focus:outline-none flex items-center space-x-3"
            onClick={() => history.push('/metiers/recherche')}
          >
            <SearchSvg fill="#223A7A" />
            <span className="inline-block mt-1 text-lena-blue-dark text-sm">Rechercher un métier</span>
          </button>
          <button className="focus:ring-0 focus:outline-none">
            <UserSvg />
          </button>
        </div>
      </header>
      <div className="container flex flex-col items-center mt-16 mb-5">
        <TopJobSvg />
        <h1 className="text-lena-blue-dark font-bold text-xl mt-2">Mon Top Métiers</h1>
        <p className="text-lena-blue-dark text-sm text-center mt-5">
          En fonction des expériences, compétences et centres d’intérets que vous avez renseignés, voici{' '}
          <strong>10 métiers qui pourraient vous plaire :</strong>
        </p>
        <button className="flex items-center space-x-3 focus:ring-0 focus:outline-none mt-5">
          <InfoSvg />
          <span className="text-lena-blue-dark text-sm">Comment ça marche ?</span>
        </button>
      </div>
      <div style={{ background: `url(${PeintureImg}) no-repeat fixed`, backgroundSize: 'cover' }}>
        <div className="container py-5">
          <CardJob />
          <CardJob />
          <CardJob />
          <CardJob />
          <CardJob />
          <CardJob />
          <CardJob />
        </div>
      </div>
    </div>
  );
};

export default TopJobContainer;
