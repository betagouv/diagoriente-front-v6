import React, { useState, useEffect } from 'react';
import { RouteComponentProps, Route, Switch } from 'react-router-dom';
import { Theme, Activity, ThemeDomain } from 'common/requests/types';
import { decodeUri } from 'common/utils/url';
import { isEmpty } from 'lodash';
import { useWillUnmount } from 'common/hooks/useLifeCycle';
import { useLazyThemes } from 'common/requests/themes';
import { useSkill } from 'common/requests/skills';

import QuestionXPContainer from 'containers/ExperienceContainer/CommonContainers/QuestionsContainer';
import ActiviteContainer from 'containers/ExperienceContainer/CommonContainers/ChoixActivites';
import DoneActiviteContainer from 'containers/ExperienceContainer/CommonContainers/AddActivityDone';
import SelectionTheme from './SelectionTheme';
import SelectionThemePro from '../XPPro/ParcoursContainer/containers/SelectionTheme';
import DomainSelect from '../XPPro/ParcoursContainer/containers/DomainSelect';

const SkillRoute = ({ match, location }: RouteComponentProps<{ id: string }>) => {
  const [theme, setTheme] = useState({} as Theme);
  const [activities, setActivities] = useState([] as Activity[]);
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
    if (params.type && params.type !== 'professional') {
      loadThemes({ variables: { domain: renderType() as ThemeDomain } });
    }
  }, [params.type]);

  useWillUnmount(() => {
    localStorage.removeItem('theme');
    localStorage.removeItem('activities');
  });

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
        render={(props) => <ActiviteContainer {...props} activities={activities} setActivities={setActivities} />}
      />
      <Route exact path="/experience/theme/:id/doneAct" render={() => <DoneActiviteContainer theme={theme} />} />
      <Route exact path="/experience/theme/:id/question" render={() => <QuestionXPContainer theme={theme} />} />
    </Switch>
  );
};

export default SkillRoute;
