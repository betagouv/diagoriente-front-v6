import React, { useContext } from 'react';
import userContext from 'common/contexts/UserContext';
import { Redirect, Link } from 'react-router-dom';
import AppLayout from 'layouts/AppLayout';
import Button from '../../components/design-system/Button';

const HomeContainer = () => {
  const { user } = useContext(userContext);

  if (!user) {
    return <Redirect to="/connexion" />;
  }

  const urls = [
    { label: 'Onboarding', url: '/bienvenue' },
    { label: 'Mon profil', url: '/profil' },
    { label: 'Ma carte de compétences', url: '/skill_card' },
    { label: 'Mes expériences', url: '/profil/mes-experiences' },
    { label: "Mes centres d'intérêts", url: '/profil/mes-centres-d-interet/' },
    { label: "Ajouter mes centres d'intérêts", url: '/centres_interet/create' },
    { label: 'Mon top métiers', url: '/top_metiers' },
    { label: 'Rechercher une immersion', url: '/immersion/recherche' },
  ];

  return (
    <AppLayout>
      <div className="grid md:grid-cols-2 md:gap-2 mt-5 container">
        {urls.map((v) => (
          <div key={v.url} className="mb-2">
            <Link to={v.url}>
              <Button variant="secondary" fullWidth={true}>
                <div>{v.label}</div>
                <div className="text-lena-turquoise">{v.url}</div>
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </AppLayout>
  );
};

export default HomeContainer;
