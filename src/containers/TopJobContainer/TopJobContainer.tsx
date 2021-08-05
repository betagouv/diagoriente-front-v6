import React, { FunctionComponent } from 'react';
import { ReactComponent as TopJobSvg } from 'assets/svg/top_job.svg';
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
  const isDesktop = useMediaQuery('md');

  return (
    <JobsLayout>
      <div className="container flex flex-col items-center py-8 space-y-8 md:overflow-auto">
        <div className="flex flex-col items-center justify-center space-y-2">
          {!isDesktop && <TopJobSvg />}
          <h2 className="text-lena-blue-dark font-bold text-xl">10 métiers pour vous</h2>
          <p className="text-lena-blue-dark text-sm text-center md:w-3/4">
            En fonction des expériences, compétences et centres d’intérets que vous avez renseignés
          </p>
        </div>
      </div>
      <div
        className="flex flex-1 md:overflow-auto"
        style={{ background: `url(${PeintureImg}) no-repeat fixed`, backgroundSize: 'cover' }}
      >
        <div className="flex-1 px-4 xl:px-16 py-4 grid md:grid-cols-2 gap-4">
          <CardJob />
          <CardJob />
          <CardJob />
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
