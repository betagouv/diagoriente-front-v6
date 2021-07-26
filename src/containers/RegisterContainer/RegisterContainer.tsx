import React from 'react';
import HeroRegister from 'assets/illu/hero-register.png';
import BgRegister from 'assets/images/bg/bg-register.jpg';
import AppHeader from 'layouts/AppHeader';
import RegisterForm from './components/RegisterForm';

const RegisterContainer = () => (
  <div>
    <AppHeader />
    <div className="md:h-screen w-full flex-1 flex flex-row">
      <div className="flex-1 px-16 pt-16 bg-lena-lightgray z-10 flex flex-col gap-y-16">
        <div className="">
          <h2 className="font-bold text-lena-blue-dark text-3xl mb-2">Inscription</h2>
          <span className="text-lena-turquoise-dark font-bold">J'ai déjà un compte</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-y-8 w-full mb-10 md:mb-0">
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
