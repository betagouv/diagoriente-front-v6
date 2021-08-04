import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import ProfileLayout from 'layouts/ProfileLayout/ProfileLayout';
import { ReactComponent as StarIcon } from 'assets/svg/star.svg';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { ReactComponent as ExpProSvg } from 'assets/svg/exp_professional.svg';
import { ReactComponent as ExpBenevolatSvg } from 'assets/svg/exp-benevolat.svg';
import { ReactComponent as ExpPersoSvg } from 'assets/svg/exp_perso_white.svg';
import useMediaQuery from 'hooks/useMediaQuery';
import AppLoader from 'components/ui/AppLoader';
import classNames from 'common/utils/classNames';
import { useListSkills, useSkillCountPerDomain } from 'common/requests/skills';
import translateExperienceType from 'utils/translateExperienceType';
import { ReactComponent as PlusSvg } from 'assets/svg/plus.svg';
import { ReactComponent as ArrowLeftSvg } from 'assets/images/svg/picto/arrow-left.svg';
import _ from 'lodash';
import CardExperience from './components/CardExperience';
import { useDidMount } from '../../../common/hooks/useLifeCycle';

const allExperienceTypes = [
  {
    label: 'Professionnelles',
    param: 'professional',
    icon: <ExpProSvg height={40} />,
  },
  {
    label: 'Personnelles',
    param: 'personal',
    icon: <ExpPersoSvg height={40} />,
  },
  {
    label: 'Bénévolat & volontariat',
    param: 'voluntary',
    icon: <ExpBenevolatSvg height={40} />,
  },
];

const MyExperiencesContainer: FunctionComponent = () => {
  const isDesktop = useMediaQuery('md');
  const location = useLocation();
  const history = useHistory();
  const [callSkills, skillsState] = useListSkills();
  const [selectedType, setSelectedType] = useState<string>();
  const [callSkillCount, skillCountState] = useSkillCountPerDomain();

  useDidMount(() => {
    const query = new URLSearchParams(location.search);
    if (query.has('type')) setSelectedType(query.get('type') || undefined);
    // Fetch skill count for all domains
    callSkillCount();
  });

  useEffect(() => {
    if (selectedType) callSkills({ variables: { domain: selectedType } });
  }, [selectedType]);

  const groupedExperiencesCount = useMemo(() => {
    return skillCountState.data ? _.groupBy(skillCountState.data.skills.data, (v) => v.domain) : {};
  }, [skillCountState.data]);

  const localizedExperienceType = translateExperienceType(selectedType || '');

  const handleSelectCard = (param: string) => {
    return isDesktop ? setSelectedType(param) : history.push(`/profil/mes-experiences/${param}`);
  };

  return (
    <ProfileLayout>
      <div className="container flex flex-col space-y-8 py-8">
        <div className="flex flex-col items-center justify-center space-y-2">
          <StarIcon height={25} />
          <h2 className="font-bold text-lena-blue-dark text-lg uppercase">Mes expériences</h2>
        </div>
        <div className="flex flex-col items-center space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-3 w-full lg:w-3/4 xl:w-1/2 gap-4">
            {allExperienceTypes.map((v) => (
              <button
                key={v.param}
                onClick={() => handleSelectCard(v.param)}
                className={classNames(
                  'flex flex-col justify-center items-center',
                  'py-8 px-4 rounded-md cursor-pointer select-none',
                  'focus:ring-0 focus:outline-none hover:bg-lena-blue-alt-light',
                  selectedType === v.param ? 'bg-lena-blue-alt-light' : 'bg-lena-blue-light2',
                )}
              >
                {v.icon}
                <div className="text-center mt-5 text-lena-blue-dark font-bold">
                  <span className="inline-block">{v.label}</span>{' '}
                  <span>({groupedExperiencesCount[v.param]?.length || 0})</span>
                </div>
              </button>
            ))}
          </div>
          {selectedType && (
            <>
              {skillsState.loading && <AppLoader />}
              {skillsState.data && (
                <div className="grid md:grid-cols-2 gap-4">
                  {skillsState.data?.skills.data.map((exp) => (
                    <CardExperience
                      key={exp.id}
                      title={exp.theme.title}
                      startDate={exp.startDate}
                      endDate={exp.endDate}
                      description={exp.activities}
                    />
                  ))}
                </div>
              )}
              <button
                onClick={() => history.push(`/experience/theme/create?type=${selectedType}`)}
                className="flex items-center focus:ring-0 focus:outline-none"
              >
                <PlusSvg />{' '}
                <span className="ml-3 text-lena-blue-dark">
                  Ajouter une expérience {localizedExperienceType.singular}
                </span>
              </button>
            </>
          )}
        </div>
      </div>
    </ProfileLayout>
  );
};

export default MyExperiencesContainer;
