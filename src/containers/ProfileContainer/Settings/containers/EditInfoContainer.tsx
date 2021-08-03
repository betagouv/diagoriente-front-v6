import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as ArrowLeftSvg } from 'assets/images/svg/picto/arrow-left.svg';
import { ReactComponent as SaveSvg } from 'assets/svg/save_white.svg';
import userContext from 'common/contexts/UserContext';
import TextField from 'components/design-system/TextField';
import InputComponent from 'components/Register/Input';
import Button from 'components/design-system/Button';
import useMediaQuery from 'hooks/useMediaQuery';
import ProfileLayout from 'layouts/ProfileLayout/ProfileLayout';

const EditInfoContainer = () => {
  const history = useHistory();
  const { user } = useContext(userContext);
  const isDesktop = useMediaQuery('md');

  return (
    <ProfileLayout>
      <div className="bg-white py-4 flex flex-col justify-start flex-1">
        <div className="container">
          <button
            onClick={() => history.push('/profil/reglages')}
            className="flex items-center mb-5 focus:ring-0 focus:outline-none"
          >
            <ArrowLeftSvg />
            <span className="text-sm mt-1 ml-3 text-lena-blue-dark">Retour</span>
          </button>
          <div className="flex flex-col items-center mb-7">
            <h2 className="font-bold text-lena-pink-dark text-xl uppercase mt-3">Modifier mes infos</h2>
          </div>
          <div className="mx-4 mb-12">
            <div className="mb-4">
              <h3 className="text-lena-blue-dark font-bold">Mes infos</h3>
            </div>
            <div className="flex mb-3 items-center">
              <span className="font-bold w-2/5 block flex-shrink-0">Nom</span>
              <TextField value={user?.firstName} />
            </div>
            <div className="flex mb-3 items-center">
              <span className="font-bold w-2/5 block flex-shrink-0">Prénom</span>
              <TextField value={user?.lastName} />
            </div>
            <div className="flex mb-3 items-center">
              <span className="font-bold w-2/5 block flex-shrink-0">Ville</span>
              <InputComponent
                fullWidth={true}
                id="location"
                name="location"
                value={user?.location.address}
                selectShow={false}
                withSelect={
                  <div>
                    <li className="p-1">Lille</li>
                    <li className="p-1">Lille</li>
                    <li className="p-1">Lille</li>
                    <li className="p-1">Lille</li>
                  </div>
                }
              />
            </div>
            <div className="flex mb-3 items-center">
              <span className="font-bold w-2/5 block flex-shrink-0">Code groupe</span>
              <TextField placeholder={user?.group} />
            </div>
            <div className="flex flex-row items-center justify-center py-8">
              <Button variant="primary" mobileStacked={true} size="md">
                {!isDesktop && <SaveSvg />}
                <span>Enregistrer</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default EditInfoContainer;
