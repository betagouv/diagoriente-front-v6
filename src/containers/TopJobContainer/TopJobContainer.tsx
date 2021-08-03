import React, { FunctionComponent } from 'react';
import { ReactComponent as SearchSvg } from 'assets/svg/search.svg';
import { ReactComponent as UserSvg } from 'assets/svg/user_profile.svg';
import { ReactComponent as TopJobSvg } from 'assets/svg/top_job.svg';
import { ReactComponent as InfoSvg } from 'assets/svg/info.svg';
import PeintureImg from 'assets/illu/topjob.svg';
import { useHistory } from 'react-router-dom';
import JobsLayout from 'layouts/JobsLayout/JobsLayout';
import useMediaQuery from 'hooks/useMediaQuery';

// TODO remove default and use ids from DB
export const CardJob: FunctionComponent<{ jobId?: string }> = ({ jobId = 'djs54sdf41dsf213' }) => {
  const history = useHistory();

  return (
    <button
      onClick={() => history.push(`/metiers/${jobId}`)}
      className="bg-lena-lightgray px-5 py-7 rounded-lg focus:ring-0 focus:outline-none text-left"
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
  const isDesktop = useMediaQuery('md');

  return (
    <JobsLayout mobileHeaderMode="search_jobs">
      {false && (
        <div style={{ background: '#E5E5E5', boxShadow: '0px 4px 4px 0px #00000040' }} className="py-3">
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
        </div>
      )}
      <div className="container flex flex-col items-center py-8 space-y-8">
        <div className="flex flex-col items-center justify-center space-y-2">
          {!isDesktop && <TopJobSvg />}
          <h2 className="text-lena-blue-dark font-bold text-xl">10 métiers pour vous</h2>
          <p className="text-lena-blue-dark text-sm text-center md:w-3/4">
            En fonction des expériences, compétences et centres d’intérets que vous avez renseignés
          </p>
        </div>
        <button className="flex items-center space-x-3 focus:ring-0 focus:outline-none">
          <InfoSvg />
          <span className="text-lena-blue-dark text-sm">Pourquoi ces métiers ?</span>
        </button>
      </div>
      <div style={{ background: `url(${PeintureImg}) no-repeat fixed`, backgroundSize: 'cover' }}>
        <div className="px-4 xl:px-16 py-4 grid md:grid-cols-2 gap-4">
          <CardJob />
          <CardJob />
          <CardJob />
          <CardJob />
          <CardJob />
          <CardJob />
          <CardJob />
        </div>
      </div>
    </JobsLayout>
  );
};

export default TopJobContainer;
