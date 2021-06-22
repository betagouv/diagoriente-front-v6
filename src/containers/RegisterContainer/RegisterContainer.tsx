import React from "react";
import HeroRegister from "assets/illu/hero-register.png";
import BgRegister from "assets/images/bg/bg-register.png";
import RegisterForm from "./RegisterForm";
import StaticHeader from "../../layouts/StaticHeader";

const RegisterContainer = () => {
  return (
    <div>
      <StaticHeader />
      <div className="md:h-screen w-full flex-1 flex flex-row">
        <div className="flex-1 md:px-16 px-4 pt-16 bg-lena-lightgray z-10 flex flex-col space-y-16">
          <div className="">
            <h2 className="font-bold text-lena-blue-dark text-3xl mb-2">Inscription</h2>
            <span className="text-lena-turquoise-dark font-bold">J'ai déjà un compte</span>
          </div>
          <div className="flex flex-col items-center justify-center w-full mb-10 md:mb-0">
            <RegisterForm />
          </div>
        </div>
        <div className="bg-lena-blue h-full hidden xl:block" style={{
          width: 568,
          background: `url(${BgRegister}) no-repeat center`,
          backgroundSize: "cover"
        }}>
          <div className="invisible xl:visible absolute top-0 right-0">
            <img placeholder="blurred" src={HeroRegister} alt="Illustration" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterContainer;
