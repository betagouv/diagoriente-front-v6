import React, { useState, useEffect, useMemo, useContext } from 'react';
import { RouteComponentProps, Route, Switch, useHistory } from 'react-router-dom';
import { Theme, Activity } from 'common/requests/types';
import { decodeUri } from 'common/utils/url';
import { useWillUnmount } from 'common/hooks/useLifeCycle';
import { useTheme } from 'common/requests/themes';
import moment from 'moment';
import { useSkill, useAddSkill } from 'common/requests/skills';

import QuestionXPContainer from 'containers/ExperienceContainer/CommonContainers/QuestionsContainer';
import ActiviteContainer from 'containers/ExperienceContainer/CommonContainers/ChoixActivites';
import DoneActiviteContainer from 'containers/ExperienceContainer/CommonContainers/AddActivityDone';
import DoneQuestions from 'containers/ExperienceContainer/CommonContainers/QuestionDone';
import CompetenceContainer from 'containers/ExperienceContainer/CommonContainers/ContainerCompetence';
import SommaireContainer from 'containers/ExperienceContainer/CommonContainers/AddExperienceDone';
import DateContainer from 'containers/ExperienceContainer/CommonContainers/DateContainer';
import RecommandationMobile from 'containers/ExperienceContainer/CommonContainers/RecommandationMobile';
import Benevolat from 'containers/ExperienceContainer/CommonContainers/Benevolat';

import PageNotFoundContainer from 'containers/PageNotFoundContainer';
import DomainSelect from '../XPPro/ParcoursContainer/containers/DomainSelect';

const SkillRoute = ({ match, location }: RouteComponentProps<{ id: string }>) => {
  const history = useHistory();
  const { skill: selectedSkillId } = decodeUri(location.search);
  const { data: dataTheme, loading, called } = useTheme({ variables: { id: match.params.id } });
  const [addSkillCall, addSkillState] = useAddSkill();
  const [activities, setActivities] = useState([] as Activity[]);
  const [levels, setLevels] = useState<string[]>([]);
  const [competencesValues, setCompetencesValues] = useState<string[]>([]);
  const [extraAct, setExtraAct] = useState('');
  const [monthStart, setMonthStart] = useState('Janvier');
  const [yearStart, setYearStart] = useState('');
  const [monthEnd, setMonthEnd] = useState('Janvier');
  const [yearEnd, setYearEnd] = useState('');
  const [optionActivities, setOptionActivities] = useState([[]] as { id: string; title: string }[][]);
  const [activity, setActivity] = useState('');

  const themeSelected = useMemo(() => {
    if (dataTheme) return dataTheme.theme;
    return null;
  }, [dataTheme]);

  const [callSkill, skillsState] = useSkill();
  useEffect(() => {
    if (selectedSkillId) callSkill({ variables: { id: selectedSkillId } });
    // eslint-disable-next-line
  }, [selectedSkillId]);

  useEffect(() => {
    if (skillsState.data) {
      const selectedSkill = skillsState.data.skill;
      setActivities(selectedSkill.activities);
    }
  }, [skillsState.data]);

  useEffect(() => {
    const d = localStorage.getItem('activities');
    if (d && !selectedSkillId) {
      const activityData = JSON.parse(d);
      setActivities(activityData.theme === match.params.id ? activityData.activities : []);
    }
    // eslint-disable-next-line
  }, [match.params.id]);

  useEffect(() => {
    if (!selectedSkillId && activities.length) {
      localStorage.setItem('activities', JSON.stringify({ theme: match.params.id, activities }));
    }
    // eslint-disable-next-line
  }, [activities, match.params.id]);

  useEffect(() => {
    const d = localStorage.getItem('levels');
    if (d && !selectedSkillId) {
      const levelsData = JSON.parse(d);
      setLevels(levelsData.length ? levelsData : []);
    }
    // eslint-disable-next-line
  }, [match.params.id]);

  useEffect(() => {
    if (!selectedSkillId && levels.length) {
      localStorage.setItem('levels', JSON.stringify({ levels }));
    }
    // eslint-disable-next-line
  }, [levels]);

  useEffect(() => {
    if (addSkillState.data) {
      history.push(`/experience/${match.params.id}/sommaire/${addSkillState.data.createSkill.id}`);
    }
  }, [addSkillState.data]);

  useWillUnmount(() => {
    localStorage.removeItem('theme');
    localStorage.removeItem('activities');
  });

  const onAddSkill = () => {
    if (dataTheme?.theme) {
      const dataToSend: {
        theme: string;
        activities: string[];
        competences: string[];
        levels: string[];
        startDate?: string;
        endDate?: string;
        extraActivity?: string;
      } = {
        theme: dataTheme?.theme.id,
        activities: activities.map((act) => act.id),
        competences: competencesValues,
        levels,
      };
      if (monthStart && yearStart) {
        const sD = moment(`01-${monthStart}-${yearStart}`).toISOString();
        dataToSend.startDate = sD;
      }
      if (monthEnd && yearEnd) {
        const sE = moment(`01-${monthEnd}-${yearEnd}`).toISOString();
        dataToSend.endDate = sE;
      }
      if (extraAct) {
        dataToSend.extraActivity = extraAct;
      }
      addSkillCall({ variables: { ...dataToSend } });
    }
  };

  if (!themeSelected && called) return <PageNotFoundContainer />;
  if (!themeSelected) return <div />;

  return (
    <Switch>
      <Route
        exact
        path="/experience/:id/domaine"
        render={(props) => <DomainSelect {...props} theme={themeSelected} />}
      />
      <Route
        exact
        path="/experience/:id/activite"
        render={(props) => (
          <ActiviteContainer
            theme={dataTheme?.theme}
            {...props}
            activities={activities}
            setActivities={setActivities}
            setExtraAct={setExtraAct}
            extraAct={extraAct}
          />
        )}
      />
      <Route
        exact
        path="/experience/:id/Benevolat"
        render={() => (
          <Benevolat
            isCreate={!selectedSkillId}
            theme={themeSelected}
            setOptionActivities={setOptionActivities}
            optionActivities={optionActivities}
            activity={activity}
            setActivity={setActivity}
          />
        )}
      />
      <Route exact path="/experience/:id/doneAct" render={() => <DoneActiviteContainer theme={themeSelected} />} />
      <Route
        exact
        path="/experience/:id/question"
        render={() => <QuestionXPContainer theme={themeSelected} levels={levels} setLevels={setLevels} />}
      />
      <Route exact path="/experience/:id/questions" render={() => <DoneQuestions theme={themeSelected} />} />
      <Route
        exact
        path="/experience/:id/competences"
        render={() => (
          <CompetenceContainer
            theme={themeSelected}
            competencesValues={competencesValues}
            setCompetencesValues={setCompetencesValues}
            onAddSkill={onAddSkill}
          />
        )}
      />
      <Route
        exact
        path="/experience/:id/date"
        render={() => (
          <DateContainer
            theme={themeSelected}
            monthStart={monthStart}
            setMonthStart={setMonthStart}
            yearStart={yearStart}
            setYearStart={setYearStart}
            monthEnd={monthEnd}
            setMonthEnd={setMonthEnd}
            yearEnd={yearEnd}
            setYearEnd={setYearEnd}
          />
        )}
      />
      <Route
        exact
        path="/experience/:id/sommaire/:idSkill"
        render={() => <SommaireContainer data={addSkillState.data} />}
      />
      <Route exact path="/experience/:id/recommendation/:idSkill" render={() => <RecommandationMobile />} />
    </Switch>
  );
};

export default SkillRoute;
