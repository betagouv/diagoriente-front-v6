import React, { FunctionComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import WipAddExperienceDone from './containers/WIPAddExperienceDone';
import WipSelectionTheme from './containers/WIPSelectionTheme';
import WipChoixActivites from './containers/WIPChoixActivites';
import WipSelectionCompetence from './containers/WIPSelectionCompetence';
import WipDomainSelect from './containers/WIPDomainSelect';
import WipAddActivityDone from './containers/WIPAddActivityDone';

const WipExperienceContainer: FunctionComponent = () => {
  return (
    <Switch>
      <Route exact path="/experience" />
      <Route exact path="/experience/theme" component={WipSelectionTheme} />
      <Route exact path="/experience/domain" component={WipDomainSelect} />
      <Route exact path="/experience/activites" component={WipChoixActivites} />
      <Route exact path="/experience/activites/done" component={WipAddActivityDone} />
      <Route exact path="/experience/competences" component={WipSelectionCompetence} />
      <Route exact path="/experience/done" component={WipAddExperienceDone} />
    </Switch>
  );
};

export default WipExperienceContainer;
