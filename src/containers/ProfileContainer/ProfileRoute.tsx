import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import createLazyComponent from '../../utils/createLazyComponent';

const EditInfoContainer = createLazyComponent(() => import('./Settings/containers/EditInfoContainer'));
const ProfileSettingsContainer = createLazyComponent(() => import('./Settings/ProfileSettingsContainer'));
const EditLogin = createLazyComponent(() => import('./Settings/containers/EditLogin'));
const MyExperiencesContainer = createLazyComponent(() => import('./MyExperiences/MyExperiencesContainer'));
const MyExperiencesByThemeContainer = createLazyComponent(
  () => import('./MyExperiences/MyExperiencesByThemeContainer'),
);
const MyInterestsContainer = createLazyComponent(() => import('./Interests/MyInterestsContainer'));

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
