import React, { useContext } from 'react';
import userContext from 'common/contexts/UserContext';
import { Redirect, Link } from 'react-router-dom';
import AppLayout from 'layouts/AppLayout';

const HomeContainer = () => {
  const { user } = useContext(userContext);

  if (!user) {
    return <Redirect to="/connexion" />;
  }

  return (
    <AppLayout>
      <div className="mt-5 container">
        <div className="mb-2">
          <Link to="/bienvenue">
            <button
              className={`bg-lena-blue w-full text-white font-bold
            py-3 rounded-md focus:ring-0 focus:outline-none`}
            >
              Bienvenue
            </button>
          </Link>
        </div>
        <div className="mb-2">
          <Link to="/experience">
            <button
              className={`bg-lena-blue w-full text-white font-bold py-3
              rounded-md focus:ring-0 focus:outline-none`}
            >
              Expérience
            </button>
          </Link>
        </div>
        <Link to="/centres_interet">
          <button
            className={`bg-lena-blue w-full text-white font-bold py-3
          rounded-md focus:ring-0 focus:outline-none`}
          >
            Centres d'intérêt
          </button>
        </Link>
        <div className="mt-2">
          <Link to="/centres_interet/create">
            <button
              className={`bg-lena-blue w-full text-white font-bold py-3
            rounded-md focus:ring-0 focus:outline-none`}
            >
              Ajouter centres d'intérêt
            </button>
          </Link>
        </div>
        <div className="mt-2">
          <Link to="/top_metiers">
            <button
              className={`bg-lena-blue w-full text-white font-bold py-3
            rounded-md focus:ring-0 focus:outline-none`}
            >
              Top métiers
            </button>
          </Link>
        </div>
        <div className="mt-2">
          <Link to="/profil">
            <button className="bg-lena-blue w-full text-white font-bold py-3 rounded-md focus:ring-0 focus:outline-none">
              Profil
            </button>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
};

export default HomeContainer;
