import React, { FunctionComponent } from 'react';
import { ReactComponent as TimeJobSvg } from '../../../assets/svg/time_job.svg';
import { ReactComponent as ChartJobSvg } from '../../../assets/svg/chart_job.svg';
import JobStatCard from './JobStatCard';
import JobChartStat from './JobChartStat';

const JobStatistics: FunctionComponent = () => {
  const similarJobs = [
    { id: 1, title: 'Expert.e automobile' },
    { id: 2, title: 'Designer industriel' },
    { id: 3, title: 'Ingénieur/e électronicien/ne' },
  ];

  return (
    <div className="flex flex-col space-y-4 pb-4 md:pb-0">
      <div className="space-x-2 p-4 font-bold bg-lena-blue-alt-light bg-opacity-50">
        <span className="text-lena-blue-dark">Niveau d'accès :</span>
        <span className="text-lena-dark">DEUG, BTS, DUT</span>
      </div>
      <div className="md:divide-y-2 divide-lena-blue-dark divide-opacity-10">
        <div className="container md:px-0 md:pb-4 space-y-4">
          <div className="text-lena-blue-dark font-bold">L'offre et la demande :</div>
          <div className="grid md:grid-cols-2 gap-4">
            <JobStatCard title="Sur les 12 derniers mois, en moyenne :" icon={<TimeJobSvg />}>
              <strong>22</strong> offres pour <strong>550</strong> demandeurs d'emploi
            </JobStatCard>
            <JobStatCard title="Sur les 12 derniers mois, en moyenne :" icon={<ChartJobSvg />}>
              <strong>4</strong> offres pour <strong>10 demandeurs d'emploi</strong>
            </JobStatCard>
          </div>
        </div>
        <div className="pt-4 grid md:grid-cols-2 gap-4">
          <div className="order-2 md:order-1 container md:px-0">
            <div className="text-lena-blue-dark font-bold">Type de contrat :</div>
            <JobChartStat />
          </div>
          <div className="order-1 md:order-2">
            <div className="bg-lena-lightgray rounded-md p-4 space-y-4">
              <div className="text-lena-blue-dark font-bold">Métiers similaires :</div>
              <div className="space-y-2">
                {similarJobs.map((v) => (
                  <div key={v.id}>
                    <div className="inline-block rounded-full font-bold bg-lena-blue-light px-4 py-1">{v.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobStatistics;
