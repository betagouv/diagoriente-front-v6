import React from 'react';
import HeroRegister from 'assets/illu/hero-register.png';
import BgRegister from 'assets/images/bg/bg-register.jpg';
import { Link } from 'react-router-dom';
import PublicHeader from 'layouts/PublicHeader';
import RegisterForm from './components/RegisterForm';

const RegisterContainer = () => (
  <div className="min-h-screen flex flex-col">
    <PublicHeader />
    <div className="md:h-screen w-full flex-1 flex flex-row">
      <div className="flex-1 px-8 pt-8 md:px-16 md:pt-16 bg-lena-lightgray z-10 flex flex-col space-y-16">
        <div className="text-center md:text-left">
          <h2 className="font-bold md:font-medium text-lena-blue-dark text-3xl mb-2">Inscription</h2>
          <Link to="/connexion" className="text-lena-turquoise-dark font-bold">
            J'ai déjà un compte
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center">
          <RegisterForm />
        </div>
      </div>
      <div
        className="bg-lena-blue h-full hidden xl:flex items-center"
        style={{ width: 568, background: `url(${BgRegister}) no-repeat center`, backgroundSize: 'cover' }}
      >
        <div className="invisible xl:visible relative">
          <img placeholder="blurred" src={HeroRegister} alt="Illustration" />
        </div>
      </div>
    </div>
  </div>
);

export default RegisterContainer;
