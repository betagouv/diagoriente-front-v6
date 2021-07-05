import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from 'layouts/AppLayout';

const ProfileContainer: FunctionComponent = () => {
  return (
    <AppLayout>
      <div className="mt-5 container">
        <div className="mb-2">
          <Link to="/profil/reglages">
            <button className="bg-lena-blue w-full text-white font-bold py-3 rounded-md focus:ring-0 focus:outline-none">
              Réglages
            </button>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProfileContainer;
