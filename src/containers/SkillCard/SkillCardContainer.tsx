import React, { FunctionComponent, useMemo, useState } from 'react';
import ExportSvg from 'assets/svg/export.svg';
import IlluSkill from 'assets/illu/illu_skill_cropped.png';
import IlluSkillFull from 'assets/illu/illu_skill_full.png';
import HelpSvg from 'assets/images/svg/picto/onboarding_help.svg';
import BrainSvg from 'assets/svg/brain.svg';
import LoveSvg from 'assets/svg/love.svg';
import { ReactComponent as BagSvg } from 'assets/svg/bag.svg';
import { ReactComponent as ExpPersoSvg } from 'assets/svg/exp_perso.svg';
import Button from 'components/design-system/Button';
import ModalComponent from 'components/design-system/Modal';
import useMediaQuery from 'hooks/useMediaQuery';
import { useListSkills } from 'common/requests/skills';
import { useDidMount } from 'common/hooks/useLifeCycle';
import _ from 'lodash';
import SkillCardExport from './SkillCardExport';
import classNames from '../../common/utils/classNames';
import ModalCardExport from './ModalCardExport';
import ExperienceGroup from './components/ExperienceGroup';
import CompetenceItem from './components/CompetenceItem';
import AppLayout from '../../layouts/AppLayout/AppLayout';

const SkillCardContainer: FunctionComponent = () => {
  const [showModalExport, setShowModalExport] = useState(false);
  const [showSelector, setShowSelector] = useState(false);
  const [showHelpComp, setShowHelpComp] = useState(false);
  const mediaQueryMD = useMediaQuery('md');
  const [fetchSkills, skillsState] = useListSkills({ fetchPolicy: 'network-only' });

  useDidMount(() => {
    fetchSkills();
  });

  const groupedExperiences = useMemo(() => {
    return skillsState.data ? _.groupBy(skillsState.data.skills.data, (v) => v.domain) : {};
  }, [skillsState.data]);

  const groupedCompetences = useMemo(() => {
    const result: any = {};
    skillsState.data?.skills.data?.forEach((skill) => {
      skill.ranks.forEach((r) => {
        if (!result[r.competence.id] || result[r.competence.id].rank < r.rank) result[r.competence.id] = r;
      });
    });
    return result;
  }, [skillsState.data]);

  return showSelector ? (
    <SkillCardExport onClose={() => setShowSelector(false)} />
  ) : (
    <AppLayout>
      <div className={classNames('pb-10', mediaQueryMD ? 'bg-lena-lightgray' : 'bg-lena-blue-dark mb-10')}>
        {mediaQueryMD ? (
          <div className="bg-lena-blue-dark pt-5 px-10 flex space-x-24 space-y-5">
            <div className="flex justify-around flex-grow">
              <div className="md:w-96 pt-10">
                <h2 className="text-white uppercase font-bold text-2xl mb-3">Ma carte de compétences</h2>
                <span className="text-white inline-block mb-8">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem consectetur ipsum dolor sit amet, con.
                </span>
                <Button onClick={() => setShowModalExport(true)} variant="primary">
                  <div className="flex items-center px-10">
                    <img className="mr-3" src={ExportSvg} alt="Export Icon" />
                    Exporter
                  </div>
                </Button>
              </div>
              <div>
                <img src={IlluSkill} alt="Illustration" />
              </div>
            </div>
          </div>
        ) : (
          <div className="container flex justify-center flex-col items-center py-8 space-y-4">
            <img src={IlluSkillFull} alt="Illustration" />
            <h2 className="text-2xl font-bold uppercase text-white text-center uppercase">Mon CV compétences</h2>
            <p className="text-sm text-white text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem consectetur ipsum dolor sit amet, con.
            </p>
          </div>
        )}

        <div className="container md:my-8">
          <div className="grid md:grid-cols-2 md:auto-cols-max gap-4">
            <div style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)' }} className="rounded-md bg-white">
              <div className="bg-lena-turquoise-light rounded-t-md py-3 pl-9 pr-5 flex items-center justify-between">
                <h3 className="text-lena-blue-dark uppercase font-bold text-lg">Mes compétences</h3>
                <button onClick={() => setShowHelpComp(true)}>
                  <img src={HelpSvg} alt="Help Icon" />
                </button>
              </div>
              <div className="px-8 py-6 bg-white rounded-b-md">
                <div className="flex items-center mb-7">
                  <img className="mr-5" src={BrainSvg} alt="Brain Icon" />
                  <div>
                    <div className="text-lena-blue-dark font-bold mt-2 text-lg uppercase">
                      Mes compétences transversales
                    </div>
                    <div className="italic text-lena-blue-dark text-sm">
                      Les competences transversales sont orem ipsum dolor sit amet, consectetur adipiscing elit.
                    </div>
                  </div>
                </div>
                <div className="space-y-8">
                  {Object.keys(groupedCompetences).map((v) => (
                    <CompetenceItem
                      key={v}
                      level={groupedCompetences[v].rank}
                      title={groupedCompetences[v].competence.title}
                      description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`}
                    />
                  ))}
                </div>
                <div className="bg-lena-lightgray mt-6 mb-6" style={{ height: 1 }} />
                <div className="flex items-center mb-7">
                  <img className="mr-5" src={LoveSvg} alt="Brain Icon" />
                  <div>
                    <div className="text-lena-blue-dark font-bold mt-2 text-lg uppercase">
                      Mes compétences d'engagement
                    </div>
                    <div className="italic text-lena-blue-dark text-sm">
                      Les competences d'engagement sont orem ipsum dolor sit amet, consectetur adipiscing.
                    </div>
                  </div>
                </div>
                <div>... WIP ...</div>
              </div>
            </div>
            <div style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)' }} className="rounded-md bg-white">
              <div className="bg-lena-blue-lightest rounded-t-md py-3 pl-9 pr-5 flex items-center justify-between">
                <h3 className="text-lena-blue-dark uppercase font-bold text-lg">Mes expériences</h3>
              </div>
              <div className="bg-white rounded-b-md divide-y divide-lena-lightgray">
                <ExperienceGroup
                  icon={<BagSvg />}
                  type="professional"
                  title="Mes expériences pro"
                  experiences={groupedExperiences.professional}
                />
                <ExperienceGroup
                  icon={<ExpPersoSvg />}
                  type="personal"
                  title="Mes expériences persos"
                  experiences={groupedExperiences.personal}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-lena-pink-dark fixed bottom-0 left-0 right-0 flex justify-center py-4 md:hidden">
          <button onClick={() => setShowModalExport(true)} className="flex items-center text-white font-bold text-lg">
            <img className="mr-2" src={ExportSvg} alt="Export Svg" />
            Exporter
          </button>
        </div>
        <ModalCardExport
          open={showModalExport}
          onSelect={() => setShowSelector(true)}
          onClose={() => setShowModalExport(false)}
        />
        <ModalComponent open={showHelpComp}>
          <div className="flex flex-col items-center justify-center py-5">
            <div className="w-1/2 flex justify-center flex-col items-center">
              <img alt="Help Svg" src={HelpSvg} className="mb-5" />
              <div>
                Pour <strong>supprimer ou éditer une compétence,</strong> vous devez modifier l'
                <strong>expérience</strong> dans laquelle vous avez renseigné cette compétence.
              </div>
              <div className="mt-4">
                NB : Si une compétence est associée à plusieurs expériences, par défaut, c’est le niveau de compétence
                le plus élevé qui apparaît dans la carte de compétences.
              </div>
              <div className="mt-7">
                <Button onClick={() => setShowHelpComp(false)} size="md" variant="primary">
                  OK
                </Button>
              </div>
            </div>
          </div>
        </ModalComponent>
      </div>
    </AppLayout>
  );
};

export default SkillCardContainer;
