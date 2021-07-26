import React, { useState } from 'react';
import { ReactComponent as UserSvg } from 'assets/svg/user_profile.svg';
import { ReactComponent as ArrowLeftSvg } from 'assets/images/svg/picto/arrow-left.svg';
import { ReactComponent as SearchSvg } from 'assets/svg/search_job.svg';
import DetailJobImg from 'assets/illu/topjob.svg';
import { useHistory } from 'react-router-dom';
import { ReactComponent as ArrowBottomSvg } from 'assets/svg/arrow_down.svg';
import { ReactComponent as SearchInputSvg } from 'assets/svg/search.svg';
import { ReactComponent as LoveTSvg } from 'assets/svg/love_turquoise.svg';
import { ReactComponent as LoveTLSvg } from 'assets/svg/love_turquoise_light.svg';
import { ReactComponent as TimeJobSvg } from 'assets/svg/time_job.svg';
import { ReactComponent as ChartJobSvg } from 'assets/svg/chart_job.svg';
import classNames from 'common/utils/classNames';
import { Pie } from 'react-chartjs-2';

const AboutJob = () => {
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
    <div className="pb-10">
      <div
        style={{
          background: 'linear-gradient(180deg, #F3F2F4 0%, #F3F2F4 51.56%, rgba(243, 242, 244, 0) 100%), #F3F2F4',
        }}
      >
        <div className="container space-x-8 py-5 text-lg">
          <span className="font-bold text-lena-blue-dark">Niveau d'accès :</span>
          <span className="font-bold text-lena-dark">DEUG, BTS, DUT</span>
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
            <span className="text-lena-blue-dark text-lg">La semaine dernière</span>
            <span>
              <strong>22</strong> offres pour <strong>550 demandeurs d'emploi</strong>
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
            <span className="text-lena-blue-dark text-lg">Sur les 12 derniers mois, en moyenne :</span>
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
            <div className="w-1/3" />

            <ul>
              {data.datasets.map((d, i) =>
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

const Interest = () => {
  return (
    <li className="py-3" style={{ borderTop: '1px solid #C4D2F8' }}>
      <div className="px-4 flex items-start space-x-3">
        <LoveTLSvg />
        <div className="mt-1">
          <span className="text-lena-black block">Assurer un transport</span>
          <div className="-mt-1">
            <span className="inline-block rounded-full bg-lena-pink-dark" style={{ height: 8, width: 8 }} />
            <span className="text-lena-pink-dark text-sm ml-2">C'est aussi un de vos centres d'intérêt !</span>
          </div>
        </div>
      </div>
    </li>
  );
};

const DetailJob = () => {
  const history = useHistory();
  const [showAbout, setShowAbout] = useState(false);
  return (
    <div>
      <header style={{ background: '#E5E5E5', boxShadow: '0px 4px 4px 0px #00000040' }} className="py-3">
        <div className="container flex justify-between items-center">
          <button
            onClick={() => (showAbout ? setShowAbout(false) : history.push('/metiers/recherche/resultats'))}
            className="flex items-center space-x-2 focus:outline-none focus:ring-0"
          >
            <ArrowLeftSvg style={{ height: 12, width: 12 }} />
            <span className="text-lena-blue-dark text-sm mt-1">Retour</span>
          </button>
          <button className="focus:ring-0 focus:outline-none">
            <UserSvg />
          </button>
        </div>
      </header>
      <div style={{ background: `url(${DetailJobImg}) no-repeat fixed`, backgroundSize: 'cover' }}>
        <div className="container text-center py-7">
          <span className="font-bold text-white text-xl">Technicien/ne démonstrateur/trice en matériel agricole</span>
        </div>
      </div>
      {showAbout ? (
        <AboutJob />
      ) : (
        <>
          <div className="container mt-6">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla placerat nisl erat, quis cursus felis
              posuere in. Donec et volutpat turpis, ut scelerisque elit. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Nulla placerat nisl erat, quis cursus felis posuere in. Donec et volutpat turpis, ut
              scelerisque elit.
            </p>
            <div className="text-center mt-7">
              <button
                onClick={() => setShowAbout(true)}
                className="font-bold text-lena-blue-dark focus:outline-none focus:ring-0"
              >
                En savoir plus
              </button>
            </div>
          </div>
          <div className="mt-7 mb-12" style={{ border: '1px solid #C4D2F8' }} />
          <div className="container">
            <div
              className="flex justify-center flex-col items-center w-full pb-5"
              style={{
                background: 'linear-gradient(180deg, #F3F2F4 0%, #F3F2F4 51.56%, rgba(243, 242, 244, 0) 100%), #F3F2F4',
              }}
            >
              <div className="-mt-5 mb-4">
                <SearchSvg />
              </div>
              <div className="flex flex-col items-center text-center px-4">
                <span className="text-lena-blue-dark font-bold w-3/4 block mb-4">
                  Trouver une immersion ou une formation pour ce métier
                </span>
                <button
                  className={`border-2 border-lena-blue-lightest py-4 px-4
                  w-full rounded-md flex justify-between items-center mb-3 bg-white focus:ring-0 focus:outline-none`}
                  style={{ boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.15)' }}
                >
                  <div className="flex items-center space-x-3 overflow-ellipsis overflow-hidden whitespace-nowrap">
                    <span className="text-lena-blue-dark text-left overflow-ellipsis overflow-hidden whitespace-nowrap">
                      Je recherche
                    </span>
                  </div>
                  <div>
                    <ArrowBottomSvg />
                  </div>
                </button>
                <div
                  className={`w-full border border-lena-gray-light
                px-2 flex bg-white rounded-md flex items-center mb-5`}
                >
                  <SearchInputSvg fill="#C9C9C7" />
                  <input
                    placeholder="à Paris, Dijon, Lille ..."
                    className="w-full bg-transparent focus:ring-0 focus:outline-none py-3 ml-3"
                  />
                </div>
                <button
                  className={classNames(
                    `focus:ring-0 focus:outline-none w-full
                  text-white py-3 text-center font-bold text-lg md:w-72 md:rounded-lg`,
                    'bg-lena-pink-dark rounded-md',
                  )}
                >
                  Rechercher
                </button>
              </div>
            </div>
          </div>
          <div className="mt-7 mb-12" style={{ border: '1px solid #C4D2F8' }} />
          <div className="container">
            <div className="flex justify-center flex-col items-center mb-5">
              <LoveTSvg />
              <h2 className="font-bold text-lena-blue-dark text-xl mt-2">Les centres d'intérêt</h2>
              <span>associés à ce métier</span>
            </div>
            <ul style={{ borderBottom: '1px solid #C4D2F8' }}>
              <Interest />
              <Interest />
              <Interest />
              <Interest />
            </ul>
            <div
              className="mt-5 p-6 text-center rounded-md mb-6"
              style={{
                background: 'linear-gradient(180deg, #F3F2F4 0%, #F3F2F4 51.56%, rgba(243, 242, 244, 0) 100%), #F3F2F4',
              }}
            >
              <strong className="text-lena-pink-dark block">3 intérêts sur 5 en commun avec les vôtres.</strong>
              <span className="text-lena-dark">Ce métier semble plutôt bien vous correspondre !</span>
            </div>
          </div>
          <button
            className={classNames(
              `focus:ring-0 focus:outline-none w-full
                  text-white py-4 text-center font-bold text-xl md:w-72 md:rounded-lg`,
              'bg-lena-blue',
            )}
          >
            Ce métier est-il fait pour vous ?
          </button>
        </>
      )}
    </div>
  );
};

export default DetailJob;
