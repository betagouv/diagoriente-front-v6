import React, { FunctionComponent } from 'react';
import { ReactComponent as TimeJobSvg } from 'assets/svg/time_job.svg';
import { ReactComponent as ChartJobSvg } from 'assets/svg/chart_job.svg';
import { Pie } from 'react-chartjs-2';
import DetailJobImg from '../../../assets/illu/topjob.svg';

const JobStatistics: FunctionComponent = () => {
  const data = {
    datasets: [
      {
        contrats: ['CDI', 'CDD > 3 mois', 'CDD <= 3 mois', 'Intérim', 'Autre'],
        data: [42.21, 37.47, 19, 1.06, 0.26],
        backgroundColor: [
          'rgb(3, 148, 252)',
          'rgb(255, 151, 33)',
          'rgb(250, 224, 27)',
          'rgb(207, 23, 23)',
          'rgb(181, 181, 181)',
        ],
        borderWidth: 0.5,
      },
    ],
  };

  return (
    <div className="pb-8">
      <div style={{ background: `url(${DetailJobImg}) no-repeat fixed`, backgroundSize: 'cover' }}>
        <div className="container text-center py-8">
          <h2 className="font-bold text-white text-xl">Technicien/ne démonstrateur/trice en matériel agricole</h2>
        </div>
      </div>
      <div className="space-x-8 py-4 text-lg font-bold  bg-lena-blue-alt-light">
        <div className="container">
          <span className="text-lena-blue-dark">Niveau d'accès :</span>
          <span className="text-lena-dark">DEUG, BTS, DUT</span>
        </div>
      </div>
      <div className="container mt-5">
        <span className="text-lg text-lena-blue-dark block font-bold mb-3">L'offre et la demande :</span>
        <div
          style={{
            background: 'linear-gradient(180deg, #F3F2F4 0%, #F3F2F4 51.56%, rgba(243, 242, 244, 0) 100%), #F3F2F4',
          }}
          className="flex py-5 px-4 rounded-lg space-x-3 mb-5"
        >
          <div>
            <TimeJobSvg />
          </div>
          <div className="flex flex-col">
            <span className="text-lena-blue-dark">La semaine dernière</span>
            <span>
              <strong>22</strong> offres pour <strong>550</strong> demandeurs d'emploi
            </span>
          </div>
        </div>
        <div
          style={{
            background: 'linear-gradient(180deg, #F3F2F4 0%, #F3F2F4 51.56%, rgba(243, 242, 244, 0) 100%), #F3F2F4',
          }}
          className="flex py-5 px-4 rounded-lg space-x-3"
        >
          <div>
            <ChartJobSvg />
          </div>
          <div className="flex flex-col">
            <span className="text-lena-blue-dark">Sur les 12 derniers mois, en moyenne :</span>
            <span>
              <strong>4</strong> offres pour <strong>10 demandeurs d'emploi</strong>
            </span>
          </div>
        </div>
      </div>
      <div
        style={{
          background: 'linear-gradient(180deg, #F3F2F4 0%, #F3F2F4 51.56%, rgba(243, 242, 244, 0) 100%), #F3F2F4',
        }}
        className="mt-5 pt-5 pb-8"
      >
        <div className="container">
          <span className="text-lg text-lena-blue-dark block font-bold mb-3">Métiers similaires :</span>
          <ul className="space-y-2 flex flex-col items-start">
            <li className="bg-lena-blue-light font-bold px-3 py-1 rounded-full" style={{ color: '#424242' }}>
              Expert.e automobile
            </li>
            <li className="bg-lena-blue-light font-bold px-3 py-1 rounded-full" style={{ color: '#424242' }}>
              Designer industriel
            </li>
            <li className="bg-lena-blue-light font-bold px-3 py-1 rounded-full" style={{ color: '#424242' }}>
              Ingénieur/e électronicien/ne
            </li>
            <li className="bg-lena-blue-light font-bold px-3 py-1 rounded-full" style={{ color: '#424242' }}>
              Ingénieur/e en construction automobile
            </li>
            <li className="bg-lena-blue-light font-bold px-3 py-1 rounded-full" style={{ color: '#424242' }}>
              Ingénieur/e qualité moteur
            </li>
          </ul>
        </div>
      </div>
      <div className="container mt-5">
        <span className="text-lg text-lena-blue-dark block font-bold mb-3">Types de contrat :</span>
        <div className="mt-8">
          <ul className="text-lena-dark">
            <li>
              - Contrat le plus employé : <strong>CDI</strong>
            </li>
            <li>- Répartition par type de contrat :</li>
          </ul>
          <div className="flex space-x-5 items-center mt-8">
            <div className="w-1/3">
              <Pie type="" data={data} />
            </div>
            <ul>
              {data.datasets.map((d) =>
                d.backgroundColor.map((b, j) => (
                  <li className="space-x-3 text-lena-dark">
                    <span className="inline-block rounded-full" style={{ background: b, height: 10, width: 10 }} />
                    <span>
                      {d.data[j]}% - {d.contrats[j]}
                    </span>
                  </li>
                )),
              )}
            </ul>
          </div>
          <div className="text-xs text-right mt-5">(Source Pôle emploi de janvier 2019 à décembre 2019)</div>
        </div>
      </div>
    </div>
  );
};

export default JobStatistics;
