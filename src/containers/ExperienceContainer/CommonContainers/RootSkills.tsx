import React, { useState, useEffect } from 'react';
import { RouteComponentProps, Route, Switch, useHistory } from 'react-router-dom';
import { Theme, Activity, ThemeDomain } from 'common/requests/types';
import { decodeUri } from 'common/utils/url';
import { isEmpty } from 'lodash';
import { useWillUnmount } from 'common/hooks/useLifeCycle';
import { useLazyThemes } from 'common/requests/themes';
import moment from 'moment';
import { useSkill, useAddSkill } from 'common/requests/skills';

import QuestionXPContainer from 'containers/ExperienceContainer/CommonContainers/QuestionsContainer';
import ActiviteContainer from 'containers/ExperienceContainer/CommonContainers/ChoixActivites';
import DoneActiviteContainer from 'containers/ExperienceContainer/CommonContainers/AddActivityDone';
import DoneQuestions from 'containers/ExperienceContainer/CommonContainers/QuestionDone';
import CompetenceContainer from 'containers/ExperienceContainer/CommonContainers/ContainerCompetence';
import SommaireContainer from 'containers/ExperienceContainer/CommonContainers/AddExperienceDone';
import DateContainer from 'containers/ExperienceContainer/CommonContainers/DateContainer';
import SelectionTheme from './SelectionTheme';
import SelectionThemePro from '../XPPro/ParcoursContainer/containers/SelectionTheme';
import DomainSelect from '../XPPro/ParcoursContainer/containers/DomainSelect';

const SkillRoute = ({ match, location }: RouteComponentProps<{ id: string }>) => {
  const history = useHistory();
  const [theme, setTheme] = useState({} as Theme);
  const [addSkillCall, addSkillState] = useAddSkill();
  const [activities, setActivities] = useState([] as Activity[]);
  const [levels, setLevels] = useState<string[]>([]);
  const [competencesValues, setCompetencesValues] = useState<string[]>([]);
  const [extraAct, setExtraAct] = useState('');
  const [monthStart, setMonthStart] = useState('Janvier');
  const [yearStart, setYearStart] = useState('');
  const [monthEnd, setMonthEnd] = useState('Janvier');
  const [yearEnd, setYearEnd] = useState('');
  const { skill: selectedSkillId } = decodeUri(location.search);
  const params = decodeUri(location.search);

  const [loadThemes, { data }] = useLazyThemes({ fetchPolicy: 'network-only' });
  const [callSkill, skillsState] = useSkill();

  const renderType = () => {
    let type = '';
    if (params.type) {
      switch (params.type) {
        case 'professional': {
          type = 'professional';
          break;
        }
        case 'personal': {
          type = 'personal';
          break;
        }
        case 'voluntary': {
          type = 'voluntary';
          break;
        }
        default: {
          type = 'personal';
          break;
        }
      }
    }
    return type;
  };

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
    const d = localStorage.getItem('theme');
    if (d && !selectedSkillId) {
      const themeData = JSON.parse(d);
      setTheme(themeData.id === match.params.id ? themeData : {});
    }
    // eslint-disable-next-line
  }, [match.params.id]);

  useEffect(() => {
    if (!isEmpty(theme)) {
      localStorage.setItem('theme', JSON.stringify(theme));
    }
    // eslint-disable-next-line
  }, [theme, match.params.id]);

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
    if (params.type && params.type !== 'professional') {
      loadThemes({ variables: { domain: renderType() as ThemeDomain } });
    }
  }, [params.type]);

  useEffect(() => {
    if (addSkillState.data) {
      history.push(`/experience/theme/${theme.id}/sommaire?type=${theme.domain}`);
    }
  }, [addSkillState.data]);

  useWillUnmount(() => {
    localStorage.removeItem('theme');
    localStorage.removeItem('activities');
  });

  const onAddSkill = () => {
    const dataToSend: {
      theme: string;
      activities: string[];
      competences: string[];
      levels: string[];
      startDate?: string;
      endDate?: string;
      extraActivity?: string;
    } = {
      theme: theme?.id,
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
  };

  return (
    <Switch>
      <Route
        exact
        path="/experience/theme/create"
        render={(props) =>
          params.type === 'professional' ? (
            <SelectionThemePro setTheme={setTheme} theme={theme} />
          ) : (
            <SelectionTheme data={data?.themes.data} setTheme={setTheme} theme={theme} />
          )
        }
      />
      <Route exact path="/experience/theme/:id/domaine" render={(props) => <DomainSelect {...props} theme={theme} />} />
      <Route
        exact
        path="/experience/theme/:id/activite"
        render={(props) => (
          <ActiviteContainer
            theme={theme}
            {...props}
            activities={activities}
            setActivities={setActivities}
            setExtraAct={setExtraAct}
            extraAct={extraAct}
          />
        )}
      />
      <Route exact path="/experience/theme/:id/doneAct" render={() => <DoneActiviteContainer theme={theme} />} />
      <Route
        exact
        path="/experience/theme/:id/question"
        render={() => <QuestionXPContainer theme={theme} levels={levels} setLevels={setLevels} />}
      />
      <Route exact path="/experience/theme/:id/questions" render={() => <DoneQuestions theme={theme} />} />
      <Route
        exact
        path="/experience/theme/:id/competences"
        render={() => (
          <CompetenceContainer
            theme={theme}
            competencesValues={competencesValues}
            setCompetencesValues={setCompetencesValues}
            onAddSkill={onAddSkill}
          />
        )}
      />
      <Route
        exact
        path="/experience/theme/:id/date"
        render={() => (
          <DateContainer
            theme={theme}
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
        path="/experience/theme/:id/sommaire"
        render={() => (
          <SommaireContainer theme={theme} competencesValues={competencesValues} data={addSkillState.data} />
        )}
      />
    </Switch>
  );
};

export default SkillRoute;
