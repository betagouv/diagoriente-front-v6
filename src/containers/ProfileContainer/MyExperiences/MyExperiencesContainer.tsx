import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import ProfileLayout from 'layouts/ProfileLayout/ProfileLayout';
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
import _ from 'lodash';
import { useDidMount } from 'common/hooks/useLifeCycle';
import Button from 'components/design-system/Button';
import CardExperience from './components/CardExperience';

const allExperienceTypes = [
  {
    label: 'Mes expériences professionnelles',
    labelTablet: 'Mes expériences pro',
    labelMobile: 'Pro',
    param: 'professional',
    icon: <ExpProSvg height={40} />,
  },
  {
    label: 'Mes expériences personnelles',
    labelTablet: 'Mes expériences perso',
    labelMobile: 'Perso',
    param: 'personal',
    icon: <ExpPersoSvg height={40} />,
  },
  {
    label: 'Mes expériences Bénévolat & volontariat',
    labelTablet: 'Mes expériences Bénévolat & volontariat',
    labelMobile: 'Bénévolat & volontariat',
    param: 'voluntary',
    icon: <ExpBenevolatSvg height={40} />,
  },
];

const MyExperiencesContainer: FunctionComponent = () => {
  const isTablet = useMediaQuery('md');
  const isDesktop = useMediaQuery('xl');
  const location = useLocation();
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

  return (
    <ProfileLayout>
      <div className="flex flex-col space-y-8 p-6">
        <div className="flex flex-col items-center space-y-8">
          <div className="grid grid-cols-3 w-full gap-2 md:gap-0">
            {allExperienceTypes.map((v) => (
              <button
                key={v.param}
                onClick={() => setSelectedType(v.param)}
                className={classNames(
                  'flex flex-col justify-start items-center',
                  'py-8 px-4 rounded-md md:rounded-none cursor-pointer select-none',
                  'focus:ring-0 focus:outline-none hover:bg-lena-blue-alt-light md:border',
                  selectedType === v.param ? 'bg-lena-blue-alt-light ' : 'bg-lena-blue-light2',
                  selectedType === v.param ? 'md:border-lena-blue' : 'md:border-transparent',
                )}
              >
                {v.icon}
                <div className="text-center mt-4 text-lena-blue-dark font-bold">
                  <span className="inline-block">{isDesktop ? v.label : isTablet ? v.labelTablet : v.labelMobile}</span>
                  <span> ({groupedExperiencesCount[v.param]?.length || 0})</span>
                </div>
              </button>
            ))}
          </div>
          {!selectedType && (
            <div>
              <div className="italic">
                Vous pouvez ici modifier les expériences que vous avez renseigné, ou bien ajouter de nouvelles
                expériences.
              </div>
            </div>
          )}
          {selectedType && (
            <div className="flex flex-col items-center w-full xl:w-5/6 2xl:w-4/6 mx-auto space-y-4">
              {skillsState.loading && <AppLoader />}
              {skillsState.data && skillsState.data.skills.data.length > 0 && (
                <>
                  <div className="flex flex-grow items-center justify-between w-full">
                    <Link to="/ajout-exp">
                      <Button variant="secondary" size="sm">
                        Ajouter une expérience
                      </Button>
                    </Link>
                  </div>
                  <div className="grid lg:grid-cols-2 gap-2 md:gap-4 w-full">
                    {skillsState.data.skills.data.map((exp) => (
                      <CardExperience
                        key={exp.id}
                        title={exp.theme.title}
                        startDate={exp.startDate}
                        endDate={exp.endDate}
                        description={exp.activities}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </ProfileLayout>
  );
};

export default MyExperiencesContainer;
