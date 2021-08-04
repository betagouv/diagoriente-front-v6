import React, { useContext } from 'react';
import userContext from 'common/contexts/UserContext';
import { Redirect, Link } from 'react-router-dom';
import AppLayout from 'layouts/AppLayout/AppLayout';
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
    { label: 'Ajouter une expérience PRO', url: '/experience/theme?type=professional' },
    { label: 'Ajouter une expérience PERSO', url: '/experience/theme?type=personal' },
    { label: 'Ajouter une expérience BENEVOLAT', url: '/experience/theme?type=voluntary' },
    { label: "Mes centres d'intérêts", url: '/profil/mes-centres-d-interet/' },
    { label: "Ajouter mes centres d'intérêts", url: '/centres_interet/create' },
    { label: 'Mon top métiers', url: '/top_metiers' },
    { label: 'Rechercher une immersion', url: '/immersion/recherche' },
  ];

  return (
    <AppLayout>
      <div className="grid md:grid-cols-2 gap-2 md:gap-4 py-4 container">
        {urls.map((v) => (
          <Link key={v.url} to={v.url}>
            <Button variant="secondary" fullWidth={true}>
              <div className="flex flex-col items-center justify-center">
                <div>{v.label}</div>
                <div className="text-lena-turquoise">{v.url}</div>
              </div>
            </Button>
          </Link>
        ))}
      </div>
    </AppLayout>
  );
};

export default HomeContainer;
