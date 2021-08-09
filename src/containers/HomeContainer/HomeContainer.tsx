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

  const groups = [
    {
      name: 'Parcours',
      paths: [
        { label: 'Onboarding', url: '/bienvenue' },
        { label: '[WIP] Ajouter une expérience - intro', url: '/ajout-exp' },
        { label: 'Ajout expérience PRO', url: '/experience/theme-pro' },
        { label: 'Ajout expérience PERSO', url: '/experience/theme?type=personal' },
        { label: 'Ajout expérience BENEVOLAT', url: '/experience/theme?type=voluntary' },
        { label: "Ajout centres d'intérêt", url: '/centres_interet/create' },
      ],
    },
    {
      name: 'Métiers / Immersion',
      paths: [
        { label: 'Mon top métiers', url: '/metiers/mon-top-metiers' },
        { label: 'Example fiche métier', url: '/metiers/123-example' },
        { label: 'Rechercher une immersion', url: '/immersion/recherche' },
      ],
    },
    {
      name: 'Mon profil / compte',
      paths: [
        { label: 'Mes expériences', url: '/profil/mes-experiences' },
        { label: "Mes centres d'intérêt", url: '/profil/mes-centres-d-interet/' },
        { label: 'Mon CV compétences', url: '/mon-cv-competences' },
        { label: 'Mon compte', url: '/profil/reglages' },
      ],
    },
  ];

  return (
    <AppLayout>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 py-4 container">
        {groups.map((v) => (
          <div className="divide divide-lena-lightgray-2 bg-lena-lightgray p-4 space-y-4 rounded-lg">
            <div className="text-xl font-bold">{v.name}</div>
            <div className="grid grid-cols-1 gap-y-2">
              {v.paths.map((w) => (
                <Link key={w.url} to={w.url}>
                  <Button variant="darkBlue" fullWidth={true}>
                    <div className="flex flex-col items-center justify-center">
                      <div>{w.label}</div>
                      <div className="text-lena-turquoise text-sm">{w.url}</div>
                    </div>
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
};

export default HomeContainer;
