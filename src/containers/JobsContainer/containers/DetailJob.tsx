import React, { FunctionComponent, useState } from 'react';
import JobsLayout from 'layouts/JobsLayout/JobsLayout';
import Button from 'components/design-system/Button';
import { ReactComponent as SearchSvg } from 'assets/svg/search_job.svg';
import { ReactComponent as LoveTSvg } from 'assets/svg/love_turquoise.svg';
import classNames from 'common/utils/classNames';
import { ReactComponent as ArrowBottomSvg } from 'assets/svg/arrow_down.svg';
import { ReactComponent as SearchInputSvg } from 'assets/svg/search.svg';
import { ReactComponent as PlusSvg } from 'assets/svg/plus.svg';
import { ReactComponent as LessSvg } from 'assets/svg/less.svg';
import { useHistory } from 'react-router-dom';
import JobInterestItem from '../components/JobInterestItem';
import JobStatistics from '../components/JobStatistics';
import JobHeader from '../components/JobHeader';
import useMediaQuery from '../../../hooks/useMediaQuery';

const DetailJob: FunctionComponent = () => {
  const history = useHistory();
  const [showAbout, setShowAbout] = useState(false);
  const isDesktop = useMediaQuery('md');

  const handleOpenStatistics = () => {
    if (isDesktop) setShowAbout(!showAbout);
    else history.push('/metiers/123456789/statistiques');
  };

  return (
    <JobsLayout>
      <div className="flex flex-col pb-8 md:pb-8 overflow-auto">
        <JobHeader />
        <div
          className={`px-4 md:px-8 md:px-16 2xl:px-64 py-8 space-y-4 overflow-auto
          divide-y divide-lena-blue-alt-light`}
        >
          <div className="flex flex-col space-y-4">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla placerat nisl erat, quis cursus felis
              posuere in. Donec et volutpat turpis, ut scelerisque elit. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Nulla placerat nisl erat, quis cursus felis posuere in. Donec et volutpat turpis, ut
              scelerisque elit.
            </p>
            {showAbout && <JobStatistics />}
            <div className="text-right">
              <Button onClick={handleOpenStatistics} variant="outline-light" size="sm">
                <span>Détails</span>
                <div>{showAbout ? <LessSvg /> : <PlusSvg />}</div>
              </Button>
            </div>
          </div>
          <div className="py-4 grid lg:grid-cols-2 gap-4">
            <div className="order-1 lg:order-2">
              <div className="p-6 bg-lena-lightgray rounded-lg flex-1">
                <div className="flex flex-col items-center text-center space-y-4">
                  <SearchSvg height={48} width={48} />
                  <div className="text-lena-blue-dark font-bold w-3/4 block mb-4">
                    Trouver une immersion ou une formation pour ce métier
                  </div>
                  <div className="w-full">
                    <button
                      className={`border-2 border-lena-blue-lightest py-4 px-4
                  w-full rounded-md flex justify-between items-center mb-3 bg-white focus:ring-0 focus:outline-none`}
                      style={{ boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.15)' }}
                    >
                      <div className="flex items-center space-x-3 overflow-ellipsis overflow-hidden">
                        <span className="text-lena-blue-dark text-left overflow-ellipsis overflow-hidden">
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
                  text-white py-3 text-center font-bold text-lg md:rounded-lg`,
                        'bg-lena-pink-dark rounded-md',
                      )}
                    >
                      Rechercher
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-2 lg:order-1">
              <div className="p-6 bg-lena-lightgray rounded-lg flex-1">
                <div className="flex flex-col text-center items-center space-y-4">
                  <LoveTSvg height={48} width={48} />
                  <div className="font-bold text-lena-blue-dark">Les centres d'intérêt associés à ce métier</div>
                </div>
                <div className="py-4 divide-y divide-lena-blue-alt-light">
                  <JobInterestItem />
                  <JobInterestItem />
                  <JobInterestItem />
                  <JobInterestItem />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            className={classNames(
              'fixed md:static bottom-0 left-0 focus:ring-0 focus:outline-none w-full',
              'text-white py-4 text-center font-bold text-xl md:w-auto px-8 md:rounded-lg',
              'bg-lena-blue',
            )}
          >
            Ce métier est-il fait pour vous ?
          </button>
        </div>
      </div>
    </JobsLayout>
  );
};

export default DetailJob;
