import React, { useReducer } from 'react';
import { Switch } from 'react-router-dom';
import UserContext from 'common/contexts/UserContext';
import useRoot from 'common/hooks/useRoot';
import Route from 'components/ui/Route';
import SnackBarContext, { snackbarState, snackbarReducer } from 'common/contexts/SnackbarContext';
import HomeContainer from './HomeContainer/HomeContainer';
import LoginContainer from './LoginContainer';
import RegisterContainer from './RegisterContainer';
import OnBoardingContainer from './OnBoardingContainer';
import PageNotFoundContainer from './PageNotFoundContainer';
import SkillCardContainer from './SkillCard';
import ExperienceRoute from './ExperienceContainer/ExperienceRoute';
import CenterInterestRoute from './CenterInterestContainer/CenterInterestRoute';
import ProfileRoute from './ProfileContainer/ProfileRoute';
import TopJobRoute from './TopJobContainer/TopJobRoute';
import MyExperiencesRoute from './MyExperiencesContainer/MyExperiencesRoute';
import JobsRoute from './JobsContainer/JobsRoute';
import ImmersionRoute from './ImmersionContainer/ImmersionRoute';

const RootContainer = () => {
  const { startupEnd, user, setUser } = useRoot();
  const [state, dispatch] = useReducer(snackbarReducer, snackbarState);

  if (!startupEnd) return <div />;

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <SnackBarContext.Provider value={{ state, dispatch }}>
        <Switch>
          <Route exact path="/" component={HomeContainer} />
          <Route exact path="/connexion" component={LoginContainer} />
          <Route exact path="/inscription" component={RegisterContainer} />
          <Route exact path="/bienvenue" component={OnBoardingContainer} />
          <ProfileRoute path="/profil" />
          <Route path="/mes-experiences" component={MyExperiencesRoute} />
          <Route path="/experience" component={ExperienceRoute} />
          <Route path="/metiers" component={JobsRoute} />
          <Route path="/immersion" component={ImmersionRoute} />
          <CenterInterestRoute path="/centres_interet" />
          <Route exact path="/skill_card" component={SkillCardContainer} />
          <TopJobRoute path="/top_metiers" />
          <Route exact path="/404" component={PageNotFoundContainer} />
          <Route component={PageNotFoundContainer} />
        </Switch>
      </SnackBarContext.Provider>
    </UserContext.Provider>
  );
};

export default RootContainer;
