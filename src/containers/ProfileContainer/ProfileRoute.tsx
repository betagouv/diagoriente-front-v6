import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import EditInfoContainer from './Settings/containers/EditInfoContainer';
import ProfileSettingsContainer from './Settings/ProfileSettingsContainer';
import EditLogin from './Settings/containers/EditLogin';
import MyExperiencesContainer from './MyExperiences/MyExperiencesContainer';
import MyExperiencesByThemeContainer from './MyExperiences/MyExperiencesByThemeContainer';
import MyInterestsContainer from './Interests/MyInterestsContainer';

type Props = {
  path: string;
};

const ProfileRoute = ({ path }: Props) => {
  return (
    <Switch>
      <Route exact path={`${path}/mes-experiences`} component={MyExperiencesContainer} />
      <Route exact path={`${path}/mes-experiences/:type`} component={MyExperiencesByThemeContainer} />

      <Route exact path={`${path}/mes-centres-d-interet/`} component={MyInterestsContainer} />

      <Route exact path={`${path}/reglages`} component={ProfileSettingsContainer} />
      <Route exact path={`${path}/reglages/infos`} component={EditInfoContainer} />
      <Route exact path={`${path}/reglages/login`} component={EditLogin} />

      <Redirect to="/profil/reglages" />
    </Switch>
  );
};

export default ProfileRoute;
