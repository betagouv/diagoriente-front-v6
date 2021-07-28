import React, { FunctionComponent, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { ReactComponent as UserProfileIcon } from 'assets/svg/user_profile.svg';
import ProgressBar from 'components/design-system/ProgressBar';
import { decodeUri } from 'common/utils/url';

const ParcoursExperienceLayoutForMobile: FunctionComponent = ({ children }) => {
  const location = useLocation();
  const step = location.pathname.split('/').pop();
  const params = decodeUri(location.search);
  const renderStep = () => {
    let title = '';
    let ind = 0;
    switch (step) {
      case 'domaine': {
        title = '> Choix du domaine';
        ind = 1;
        break;
      }
      case 'date': {
        title = '> Sélection de date';
        ind = 2;
        break;
      }
      case 'activite': {
        title = '> Choix des activités';
        ind = 3;
        break;
      }
      case 'question': {
        title = '> Sélection des question';
        ind = 4;
        break;
      }
      case 'competences': {
        title = '> Sélection des compétences';
        ind = 5;
        break;
      }

      default: {
        title = '> Choix du domaine';
        ind = 1;
        break;
      }
    }
    return { title, ind };
  };
  const renderTitleExp = () => {
    let title = '';
    if (params.type) {
      switch (params.type) {
        case 'personal': {
          title = 'Mes expériences personnel';
          break;
        }
        case 'professional': {
          title = 'EXPéRIENCE PRO';
          break;
        }
        case 'voluntary': {
          title = 'EXPéRIENCE BENEVOLAT';
          break;
        }
        default: {
          title = 'Mes expériences personnel';
          break;
        }
      }
    }
    return title;
  };

  return (
    <div className="min-h-screen md:min-h-0 h-full flex flex-col">
      <div className="sticky top-0 shadow-md z-50">
        <ProgressBar value={renderStep().ind} maxValue={5} />
        <div className="p-2 bg-lena-lightgray flex flex-row items-center justify-between">
          <div>
            <strong className="text-lena-blue">{renderTitleExp()}</strong> {renderStep().title}
          </div>
          <UserProfileIcon />
        </div>
      </div>
      <div className="flex flex-col items-center justify-start flex-1">{children}</div>
    </div>
  );
};

export default ParcoursExperienceLayoutForMobile;
