import AppLayout from 'layouts/AppLayout/AppLayout';
import React, { FunctionComponent } from 'react';
import ButtonWithPopover from '../../components/misc/ButtonWithPopover';

const ExperienceIntroContainer: FunctionComponent = () => {
  return (
    <AppLayout>
      <div className="text-center flex flex-1 flex-col items-center justify-center px-4 w-full">
        <div className="w-full">
          <h2 className="text-lena-blue-dark font-bold text-lg">Ajouter une expérience...</h2>
          <div className="mt-5 md:flex md:flex-col md:w-auto md:mt-10">
            <ButtonWithPopover
              path="/experience/theme-pro"
              popover={`Même si vous voulez changer de voie,
                  vos expériences professionnelles vous ont fait gagner en compétence.`}
            >
              Professionnelle
            </ButtonWithPopover>
            <ButtonWithPopover
              path="/experience/theme?type=voluntary"
              popover="Garder des enfants, des animaux, aider un voisin, organiser un événement..."
            >
              Personnelle
            </ButtonWithPopover>
            <ButtonWithPopover
              path="/experience/theme?type=voluntary"
              popover="Service civique, bénévolat, vie associative..."
            >
              De bénévolat
            </ButtonWithPopover>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ExperienceIntroContainer;
