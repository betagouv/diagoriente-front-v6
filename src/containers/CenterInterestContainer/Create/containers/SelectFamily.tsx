import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as LineSvg } from 'assets/svg/line.svg';
import { ReactComponent as InfoSvg } from 'assets/svg/info_yellow.svg';
import { ReactComponent as CheckSvg } from 'assets/svg/check_blue.svg';
import CollectifSvg from 'assets/svg/collectif.svg';
import IndividuelSvg from 'assets/svg/individuel.svg';
import classNames from 'common/utils/classNames';
import useMediaQuery from 'hooks/useMediaQuery';
import { useInterests } from 'common/requests/interests';
import ParcoursInterestsLayout from '../../../../layouts/ParcoursInterestsLayout/ParcoursInterestsLayout';
import { useDidMount } from '../../../../common/hooks/useLifeCycle';
import AppLoader from '../../../../components/ui/AppLoader';

type Props = {
  onStep: (familyId: string) => void;
  onRemoveFamily: (familyId: string) => void;
  onFinish: () => void;
  selectedFamilies: { [family: string]: string[] };
};

const SelectFamily = ({ onStep, onRemoveFamily, selectedFamilies, onFinish }: Props) => {
  const isDesktop = useMediaQuery('md');
  const [getInterestsCall, getInterestsState] = useInterests();

  useDidMount(() => {
    getInterestsCall();
  });

  const family = (title: string, familyId: string, imgLeft: any, imgRight: any, active?: boolean) => {
    return (
      <button
        key={familyId}
        onClick={() =>
          familyId in selectedFamilies ? onRemoveFamily.call(null, familyId) : onStep.call(null, familyId)
        }
        className="focus:ring-0 focus:outline-none w-full"
      >
        <li
          className={classNames(
            'flex justify-between items-center px-4 md:px-8 py-2 md:py-4 rounded-lg border-2 relative',
            'hover:bg-opacity-60 hover:border-lena-gray-light-2 bg-opacity-30',
            active
              ? 'bg-lena-yellow-light border-lena-yellow hover:border-lena-yellow-dark'
              : 'bg-lena-gray-light-2 border-transparent',
          )}
        >
          <img src={imgLeft} alt="Svg" />
          <div className="text-lena-blue-dark">
            <div className={classNames(active && 'font-bold')}>{title}</div>
            {active && <div>{selectedFamilies[familyId]?.length} centre(s) d'int??r??t s??lectionn??s</div>}
          </div>
          <img src={imgRight} alt="Svg" />
          {active && (
            <div className="absolute -right-2 -top-2">
              <CheckSvg />
            </div>
          )}
        </li>
      </button>
    );
  };

  return (
    <ParcoursInterestsLayout>
      <div className="container pt-8 pb-16 md:pb-8 flex flex-col items-center justify-start space-y-8 md:p-12">
        <div>
          {isDesktop && (
            <div className="xl:w-3/4 w-full mx-auto">
              <p className="text-lena-blue-dark mb-5">
                Pour votre futur m??tier, vous ??tes peut-??tre int??ress??.e par des choses que vous avez d??j?? faites ou des
                choses nouvelles, des choses tr??s pr??cises ou tr??s g??n??rales...
              </p>
              <p className="text-lena-blue-dark">
                Plus de 200 centres d'int??r??t sont disponibles et class??s par familles pour vous faciliter la t??che.
              </p>
              <p className="text-lena-blue-dark mt-5 font-bold">
                Pour commencer, cliquez sur une famille pour s??lectionner les centres d'int??r??ts associ??s :
              </p>
            </div>
          )}
          {!isDesktop && (
            <p className={classNames('text-lena-blue-dark', isDesktop && 'hidden')}>
              Cliquez sur une famille pour s??lectionner les centres d'int??r??ts associ??s :
            </p>
          )}
        </div>
        <div className="w-full">
          <ul className={classNames('space-y-2', isDesktop && 'xl:w-1/2 w-full mx-auto')}>
            {getInterestsState.loading && <AppLoader />}
            {getInterestsState.data?.interests.data.map((v) =>
              family(v.title, v.id, CollectifSvg, IndividuelSvg, v.id in selectedFamilies),
            )}
          </ul>
          <div className="flex items-center justify-center">
            <button className="focus:outline-none focus:ring-0 flex flex justify-center items-center mt-7 space-x-2">
              <InfoSvg />
              <span className="text-lena-blue-dark">En quoi cela va m???aider ?? trouver mon orientation ?</span>
            </button>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0 md:relative md:flex md:justify-center">
          <button
            className={`focus:ring-0 focus:outline-none w-full bg-lena-blue
          text-white py-3 text-center font-bold text-lg md:w-96 md:rounded-md disabled:opacity-50`}
            onClick={() => onFinish?.()}
            disabled={Object.keys(selectedFamilies).length <= 0}
          >
            Suivant
          </button>
        </div>
      </div>
    </ParcoursInterestsLayout>
  );
};

export default SelectFamily;
