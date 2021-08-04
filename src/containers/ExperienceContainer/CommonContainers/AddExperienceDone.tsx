import React from 'react';
import { Competence, Theme } from 'common/requests/types';
import { useHistory, useLocation } from 'react-router-dom';
import { decodeUri } from 'common/utils/url';

import { groupBy } from 'lodash';
import Organiser from 'assets/svg/organiser.svg';
import Help from 'assets/images/svg/picto/help_white.svg';
import { SkillAddResponse } from 'common/requests/skills';
import Communication from 'assets/svg/communiquer.svg';
import Refleshir from 'assets/svg/reflechir.svg';
import ParcoursExperienceLayout from 'layouts/ParcoursExperienceLayout/ParcoursExperienceLayout';
import useMediaQuery from 'hooks/useMediaQuery';

interface Props {
  competencesValues: string[];
  theme: Theme;
  data: SkillAddResponse | undefined | null;
}
interface PropsBox {
  title: string;
  competences: {
    competence: { title: string };
    level: { title: string };
    rank: number;
  }[];
}

const AddExperienceDone = ({ competencesValues, theme, data }: Props) => {
  const history = useHistory();
  const mediaQueryMD = useMediaQuery('md');
  const location = useLocation();
  const params = decodeUri(location.search);
  const groupedCmp = groupBy(data?.createSkill.ranks, 'competence.type');
  const renderTitle = (title: string) => {
    let text = '';
    switch (title) {
      case 'organizational': {
        text = 'S’organiser';
        break;
      }
      case 'communication': {
        text = 'Communiquer';
        break;
      }
      case 'reflective': {
        text = 'Réfléchir';
        break;
      }
      default: {
        text = 'S’organiser';
      }
    }
    return text;
  };
  const renderLogo = (title: string) => {
    let text = null;
    switch (title) {
      case 'organizational': {
        text = Organiser;
        break;
      }
      case 'communication': {
        text = Communication;
        break;
      }
      case 'reflective': {
        text = Refleshir;
        break;
      }
      default: {
        text = Organiser;
      }
    }
    return text;
  };

  const RenderBox = ({ title, competences }: PropsBox) => (
    <div className="rounded p-4 bg-lena-lightgray">
      <div className="flex items-center mb-3">
        <img src={renderLogo(title)} alt="logo" />
        <p className="text-black ml-4 font-bold">{renderTitle(title)}</p>
      </div>
      <div className="divide-y divide-white">
        {competences.map((c) => {
          return (
            <div>
              <div className="flex mt-3 mb-3 w-full">
                <div className="flex-1">
                  <p className="text-lena-blue-dark text-left font-bold">{c.competence.title.toLocaleLowerCase()}</p>
                  <p className="text-thin text-sm text-black text-left">{c.level.title}</p>
                </div>
                <div className="mx-4 flex flex-col items-center" style={{ width: 40 }}>
                  <p className="text-lena-blue-dark text-thin text-sm">Niveau</p>
                  <div
                    className="rounded-full flex items-center text-lena-blue-dark font-bold justify-center"
                    style={{ height: 28, width: 28, backgroundColor: '#72D9F1' }}
                  >
                    {c.rank}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
  const path = () => {
    let text = '';
    if (params.type) {
      switch (params.type) {
        case 'professional': {
          text = 'professionnelles';
          break;
        }
        case 'personnel': {
          text = 'personnelles';
          break;
        }
        case 'voluntary': {
          text = 'bénévolat';
          break;
        }
        default: {
          text = 'personnelles';
          break;
        }
      }
    }
    return text;
  };
  return (
    <ParcoursExperienceLayout>
      <div className="bg-lena-blue-dark text-white flex flex-col text-center justify-center flex-1 py-4">
        <div className="container mt-8 text-center lg:w-4/5">
          {mediaQueryMD ? (
            <p className="text-2xl font-bold leading-loose">Bravo ! </p>
          ) : (
            <p className="text-lg font-bold leading-loose">Très bien. </p>
          )}
          {mediaQueryMD && (
            <p className="text-2xl font-bold leading-loose">Vous avez ajouté une expérience {path()} </p>
          )}
          <div className="text-base text-center">
            Vous avez ajouté une expérience et identifié de nouvelles compétences. Les voici ci dessous récapitulées en
            fonction du CEC. Vous pourrez les retrouver dans votre profil / carte de compétences.
          </div>
          <div className="flex items-center justify-center mt-8">
            <img src={Help} alt="help" />
            <p className="ml-2">Comment sont définis les niveaux ?</p>
          </div>
          <div className="flex justify-center py-8">
            <div className="grid xl:grid-cols-2 gap-2">
              {Object.keys(groupedCmp).map((key) => (
                <RenderBox title={key} competences={groupedCmp[key]} />
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center text-center space-y-8">
            <div className="text-base text-center space-y-8">
              Vous pouvez maintenant demander une <strong>recommandation</strong> pour cette expérience, elle donnera
              confiance à vos futurs recruteurs.
            </div>
            <div className="flex flex-col space-y-4">
              <button
                className={`mt-2 rounded-md focus:ring-0
            focus:outline-none w-full bg-lena-pink-dark
            text-white py-3 text-center font-bold text-lg px-16`}
              >
                Être recommandé.e
              </button>
              <div className="text-center">
                <button
                  className="font-bold text-lg mt-3 focus:ring-0, focus:outline-none"
                  onClick={() => history.push('/')}
                >
                  Passer cette étape
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ParcoursExperienceLayout>
  );
};

export default AddExperienceDone;
