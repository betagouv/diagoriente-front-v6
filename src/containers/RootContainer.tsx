import React, { useReducer, useState } from 'react';
import { Switch } from 'react-router-dom';
import UserContext from 'common/contexts/UserContext';
import ModalContext from 'common/contexts/ModalContext';
import useRoot from 'common/hooks/useRoot';
import Route from 'components/ui/Route';
import ModalComponent from 'components/design-system/ModalReco';
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
import JobsRoute from './JobsContainer/JobsRoute';
import ImmersionRoute from './ImmersionContainer/ImmersionRoute';
import ExperienceIntroContainer from './ExperienceContainer/ExperienceIntroContainer';

const RootContainer = () => {
  const { startupEnd, user, setUser } = useRoot();
  const [state, dispatch] = useReducer(snackbarReducer, snackbarState);
  const [openModal, setOpenModal] = useState(false);
  const [bgColor, setBgColor] = useState('');
  const [childrenModal, setChildrenModal] = useState<React.ReactNode | null>(null);
  const [variant, setVariant] = useState('primary' as any);

  if (!startupEnd) return <div />;

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <SnackBarContext.Provider value={{ state, dispatch }}>
        <ModalContext.Provider
          value={{ openModal, childrenModal, variant, bgColor, setBgColor, setVariant, setOpenModal, setChildrenModal }}
        >
          <Switch>
            <Route exact path="/" component={HomeContainer} />
            <Route exact path="/connexion" component={LoginContainer} />
            <Route exact path="/inscription" component={RegisterContainer} />
            <Route exact path="/bienvenue" component={OnBoardingContainer} />
            <ProfileRoute path="/profil" />
            <Route path="/experience" component={ExperienceRoute} />
            <Route path="/metiers" component={JobsRoute} />
            <Route path="/immersion" component={ImmersionRoute} />
            <CenterInterestRoute path="/centres_interet" />
            <Route exact path="/mon-cv-competences" component={SkillCardContainer} />
            <TopJobRoute path="/mon-top-metiers" />
            <Route path="/ajout-exp" component={ExperienceIntroContainer} />
            <Route exact path="/404" component={PageNotFoundContainer} />
            <Route component={PageNotFoundContainer} />
          </Switch>
          <ModalComponent
            variant={variant}
            open={openModal}
            onClose={() => setOpenModal(false)}
            isMobile
            bgColor={bgColor}
          >
            {childrenModal}
          </ModalComponent>
        </ModalContext.Provider>
      </SnackBarContext.Provider>
    </UserContext.Provider>
  );
};

export default RootContainer;
