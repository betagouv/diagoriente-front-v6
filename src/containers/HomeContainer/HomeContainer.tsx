import React, { useContext } from 'react';
import userContext from 'common/contexts/UserContext';
import { Redirect } from 'react-router-dom';
import AppLayout from '../../layouts/AppLayout';

const HomeContainer = () => {
  const { user } = useContext(userContext);

  if (!user) {
    return <Redirect to="/connexion" />;
  }

  return <AppLayout>Page d'accueil ...</AppLayout>;
};

export default HomeContainer;
