import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import OnBoardingBg from 'assets/images/bg/onboarding.jpg';
import OnBoardingWebBg from 'assets/images/bg/onboarding-web.jpg';
import OnBoardingChoiceHeader from 'assets/images/header/onboarding_choice_header.jpg';
import LogoSvg from 'assets/images/logo/diagoriente-white.svg';
import OnBoardingPictoInfoSvg from 'assets/images/svg/picto/onboarding_info.svg';
import OnBoardingPictoPolyganeSvg from 'assets/images/svg/picto/onboarding_polygone.svg';
import ArrowLeftSvg from 'assets/images/svg/picto/arrow-left.svg';
import classNames from 'common/utils/classNames';
import useMediaQuery from 'hooks/useMediaQuery';
import ButtonWithPopover from 'components/misc/ButtonWithPopover';
import AppLayout from '../../layouts/AppLayout/AppLayout';

type WelcomeProps = {
  onClick: () => void;
};

const WelcomeComponent = ({ onClick }: WelcomeProps) => {
  const mediaQueryMD = useMediaQuery('md');
  const history = useHistory();

  return (
    <div
      className="fixed w-full h-full"
      style={{
        background: `url(${mediaQueryMD ? OnBoardingWebBg : OnBoardingBg}) center center / cover no-repeat fixed`,
        backgroundSize: 'cover',
      }}
    >
      <div
        className={`md:container md:mx-auto flex flex-col justify-center
      h-full items-center text-center mx-5 space-y-20`}
      >
        <div>
          <h6 className="text-white text-xl font-normal mb-1">Bienvenue sur</h6>
          <img
            className="inline-block mb-3"
            src={LogoSvg}
            alt="Logo Diagoriente"
            style={{
              height: 'auto',
              width: '60%',
            }}
          />
          <span className="italic block text-white text-xl">Trouvez le métier fait pour vous !</span>
        </div>
        <div className="w-full md:w-auto md:flex md:flex-col">
          <button
            onClick={() => onClick.call(null)}
            className={`bg-white rounded-md py-4 px-2 w-full md:w-auto md:px-14
            block text-lena-blue-dark font-bold text-sm mb-4`}
          >
            <div className="text-lg">Je ne sais pas</div>
            <div>vers quel métier m'orienter</div>
          </button>
          <button
            onClick={() => history.push('/immersion/recherche')}
            className={`bg-white md:w-auto md:px-14 rounded-md py-4 px-2 w-full
          block text-lena-blue-dark font-bold text-sm`}
          >
            <div className="text-lg">J'ai une idée précise</div>
            <div>du métier que je recherche</div>
          </button>
          <span className="text-white inline-block mt-10">Comment ça marche ?</span>
        </div>
      </div>
    </div>
  );
};

const ChoiceComponent = () => {
  const [showHelp, setShowHelp] = useState(false);
  return (
    <div>
      <div
        style={{
          background: `url(${OnBoardingChoiceHeader})`,
          backgroundSize: 'cover',
        }}
        className={classNames('px-9 py-10 text-center space-y-5 relative')}
      >
        <span className="text-white block">
          Tout d'abord, nous allons vous <br /> demander vos expériences passées.
        </span>
        <button
          onClick={() => setShowHelp(!showHelp)}
          className="text-white flex justify-center w-full space-x-4 items-center focus:ring-0 focus:outline-none"
        >
          <img src={OnBoardingPictoInfoSvg} alt="Picto Info" />
          <span className="text-sm">Pourquoi ?</span>
        </button>
        {showHelp && (
          <div className="absolute -bottom-1 left-0 right-0 w-full">
            <div className="flex justify-center">
              <img src={OnBoardingPictoPolyganeSvg} alt="Polygone Icon" />
            </div>
          </div>
        )}
      </div>
      {!showHelp ? (
        <div className="text-center mt-14 mx-5 h-full">
          <div className="space-y-10">
            <div>
              <h2 className="text-lena-blue-dark font-bold text-lg">Je commence par renseigner mes expériences...</h2>
              <div className="mt-5 md:flex md:flex-col md:w-auto md:mt-10">
                <ButtonWithPopover
                  path="/experience/theme-pro"
                  popover={`Même si vous voulez changer de voie,
                  vos expériences professionnelles vous ont fait gagner en compétence.`}
                >
                  Professionnelles
                </ButtonWithPopover>
                <ButtonWithPopover
                  path="/experience/theme?type=voluntary"
                  popover="Garder des enfants, des animaux, aider un voisin, organiser un événement..."
                >
                  Personnelles
                </ButtonWithPopover>
                <ButtonWithPopover
                  path="/experience/theme?type=voluntary"
                  popover="Service civique, bénévolat, vie associative..."
                >
                  De bénévolat
                </ButtonWithPopover>
              </div>
            </div>
            <div>
              <button className="text-lena-blue-dark focus:ring-0 focus:outline-none">Je n'ai aucune expérience</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-8 mt-7 md:container md:mx-auto">
          <div className="mb-7">
            <button onClick={() => setShowHelp(false)} className="flex items-center focus:ring-0 focus:outline-none">
              <img src={ArrowLeftSvg} alt="Arrow Left Icon" />
              <span className="text-sm ml-2 text-lena-blue-dark">Retour</span>
            </button>
          </div>
          <h2 className="font-bold text-lena-blue-dark text-lg w-4/5 mb-6">Explication de comment ça marche</h2>
          <p className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor expedita facere ipsum laudantium quam?
            Adipisci aperiam corporis dolorem ea eius et excepturi inventore libero magnam natus nostrum odio officia,
            officiis placeat quam quia quis reiciendis sequi soluta voluptates!
          </p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet, iure.</p>
        </div>
      )}
    </div>
  );
};

const OnBoardingContainer = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showChoice, setShowCoice] = useState(false);
  const mediaQueryMD = useMediaQuery('md');
  return showChoice ? (
    mediaQueryMD ? (
      <AppLayout>
        <ChoiceComponent />
      </AppLayout>
    ) : (
      <ChoiceComponent />
    )
  ) : mediaQueryMD ? (
    <AppLayout>
      <WelcomeComponent onClick={() => setShowCoice(true)} />
    </AppLayout>
  ) : (
    <WelcomeComponent onClick={() => setShowCoice(true)} />
  );
};

// @ts-ignore
export default OnBoardingContainer;
