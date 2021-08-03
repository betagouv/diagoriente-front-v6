import React from 'react';
import { useListSkills } from 'common/requests/skills';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDidMount } from 'common/hooks/useLifeCycle';
import { ReactComponent as ExpProSvg } from 'assets/svg/exp_pro_white.svg';
import { ReactComponent as CrossSvg } from 'assets/svg/cross.svg';
import { ReactComponent as PlusSvg } from 'assets/svg/plus.svg';
import AppLoader from 'components/ui/AppLoader';
import translateExperienceType from 'utils/translateExperienceType';
import CardExperience from './components/CardExperience';

const MyExperiencesByThemeContainer = () => {
  const history = useHistory();
  const params = useParams<{ type: string }>();
  const [callSkills, skillsState] = useListSkills();

  useDidMount(() => {
    if (params.type) {
      callSkills({ variables: { domain: params.type } });
    }
  });

  const path = () => {
    return translateExperienceType(params.type);
  };

  return (
    <div className="min-h-screen h-full flex flex-col">
      <div className="shadow-lg border-lena-gray-light bg-lena-blue-light py-4">
        <div className="container flex justify-between items-center w-full">
          <div className="flex items-center">
            <ExpProSvg />
            <span className="font-bold ml-3 text-lena-blue-dark">Mes expériences {path().plural}</span>
          </div>
          <Link className="focus:ring-0 focus:outline-none" to="/profil/mes-experiences">
            <CrossSvg fill="#223A7A" />
          </Link>
        </div>
      </div>
      <div style={{ background: 'rgb(250,250,250)' }} className="py-8 flex flex-col justify-start flex-1">
        <div className="container">
          <h2 className="text-sm mb-10">
            Vous pouvez ici modifier les expériences que vous avez renseigné, ou bien ajouter de nouvelles expériences.
          </h2>
          <div className="mt-4">
            {skillsState.loading && <AppLoader />}
            {skillsState.data?.skills.data.map((exp) => {
              return (
                <CardExperience
                  key={exp.id}
                  title={exp.theme.title}
                  startDate={exp.startDate}
                  endDate={exp.endDate}
                  description={exp.activities}
                />
              );
            })}
          </div>
          <div className="flex justify-center mt-10">
            <button
              onClick={() => history.push(`/experience/theme/create?type=${path().url}`)}
              className="flex items-center focus:ring-0 focus:outline-none"
            >
              <PlusSvg /> <span className="ml-3 text-lena-blue-dark">Ajouter une expérience {path().singular}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyExperiencesByThemeContainer;
