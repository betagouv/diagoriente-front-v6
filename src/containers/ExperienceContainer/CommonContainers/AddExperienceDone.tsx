import React from 'react';
import { Competence, Theme } from 'common/requests/types';
import { useHistory } from 'react-router-dom';
import { groupBy } from 'lodash';
import Organiser from 'assets/svg/organiser.svg';
import Communication from 'assets/svg/communiquer.svg';
import Refleshir from 'assets/svg/reflechir.svg';
import ParcoursLayout from 'layouts/ParcoursExperienceLayout/ParcoursLayout';
import useMediaQuery from 'hooks/useMediaQuery';

interface Props {
  competencesValues: string[];
  theme: Theme;
}
interface PropsBox {
  title: string;
  competences: Competence[];
}

const AddExperienceDone = ({ competencesValues, theme }: Props) => {
  const history = useHistory();
  const mediaQueryMD = useMediaQuery('md');

  const cmpSelected = theme.reference?.competences.filter((cmp) => competencesValues.find((c) => cmp.id === c));
  const groupedCmp = groupBy(cmpSelected, 'type');

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
    <div className="rounded mt-3 mb-3 mx-1 p-2 md:w-45p" style={{ backgroundColor: '#F3F2F4' }}>
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
                  <p className="text-lena-blue-dark text-left font-bold">{c.title.toLocaleLowerCase()}</p>
                  <p className="text-thin text-sm text-black text-left">
                    Met en oeuvre la procédure adaptée aux problèmes courants liés à son activité
                  </p>
                </div>
                <div className="mx-4 flex flex-col items-center" style={{ width: 40 }}>
                  <p className="text-lena-blue-dark text-thin text-sm">Niveau</p>
                  <div
                    className="rounded-full flex items-center text-lena-blue-dark font-bold justify-center"
                    style={{ height: 28, width: 28, backgroundColor: '#72D9F1' }}
                  >
                    f
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <ParcoursLayout>
      <div className="bg-lena-blue-dark text-white flex flex-col text-center justify-center flex-1 py-4">
        <div className="container mt-8 text-center lg:w-4/5">
          {mediaQueryMD ? (
            <p className="text-2xl font-bold leading-loose">Bravo ! </p>
          ) : (
            <p className="text-lg font-bold leading-loose">Très bien. </p>
          )}
          {mediaQueryMD && (
            <p className="text-2xl font-bold leading-loose">Vous avez ajouté une expérience professionnelle </p>
          )}
          <div className="text-base text-center">
            Vous avez ajouté une expérience et identifié de nouvelles compétences. Les voici ci dessous récapitulées en
            fonction du CEC. Vous pourrez les retrouver dans votre profil / carte de compétences.
          </div>
          <div className="flex justify-center py-8">
            <div className="flex flex-col md:flex-row flex-wrap justify-between">
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
    </ParcoursLayout>
  );
};

export default AddExperienceDone;
