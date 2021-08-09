import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Theme } from 'common/requests/types';
import ThemeContext from 'common/contexts/ThemeContext';

import RootSkills from './CommonContainers/RootSkills';
import PageNotFoundContainer from '../PageNotFoundContainer';
import SelectionTheme from './CommonContainers/SelectionTheme';
import SelectionThemePro from './XPPro/SelectionThemePro';

const ExperienceRoute = () => {
  const [theme, setTheme] = useState<Theme | null>(null);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Switch>
        <Route exact path="/experience/theme" component={SelectionTheme} />
        <Route exact path="/experience/theme-pro" component={SelectionThemePro} />
        <Route path="/experience/:id" component={RootSkills} />
        <Route component={PageNotFoundContainer} />
      </Switch>
    </ThemeContext.Provider>
  );
};

export default ExperienceRoute;
