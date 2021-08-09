import React, { FunctionComponent } from 'react';
import PeintureImg from 'assets/illu/topjob.svg';
import { Link, useHistory } from 'react-router-dom';
import JobsLayout from 'layouts/JobsLayout/JobsLayout';
import useMediaQuery from 'hooks/useMediaQuery';
import Pill from 'components/design-system/Pill';

// TODO remove default and use ids from DB
export const CardJob: FunctionComponent<{ jobId?: string }> = ({ jobId = 'djs54sdf41dsf213' }) => {
  return (
    <Link
      to={`/metiers/${jobId}`}
      className={`flex flex-col bg-lena-lightgray p-4 rounded-lg focus:ring-0 focus:outline-none text-left space-y-2
      border border-transparent hover:border-lena-lightgray2`}
    >
      <div className="self-end">
        <Pill size="sm" extraClassName="bg-[rgb(219,247,242)]">
          DEUG, BTS, DUT
        </Pill>
      </div>
      <h3 style={{ color: '#424242' }} className="font-bold mb-1 text-lg">
        Technicien/ne démonstrateur/trice en matériel agricole
      </h3>
      <p className="text-lena-black mb-5">
        Qu'il représente une ou plusieurs marques, le technicien démonstrateur en matériel agricole...
      </p>
    </Link>
  );
};

const TopJobContainer = () => {
  return (
    <JobsLayout>
      <div className="container flex flex-col items-center py-8 space-y-8">
        <div className="flex flex-col items-center justify-center space-y-2">
          <h2 className="text-lena-blue-dark font-bold text-2xl">12 métiers pour vous</h2>
          <p className="text-lena-blue-dark text-center md:w-3/4">
            En fonction des expériences, compétences et centres d’intérets que vous avez renseignés
          </p>
        </div>
      </div>
      <div className="flex flex-1 px-4 xl:px-8 py-8 grid lg:grid-cols-2 xl:grid-cols-4 gap-2">
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
        <CardJob />
        <CardJob />
      </div>
    </JobsLayout>
  );
};

export default TopJobContainer;
