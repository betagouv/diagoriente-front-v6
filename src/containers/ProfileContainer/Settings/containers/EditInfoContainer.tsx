import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as SettingsSvg } from 'assets/svg/settings.svg';
import { ReactComponent as ArrowLeftSvg } from 'assets/images/svg/picto/arrow-left.svg';
import { ReactComponent as SaveSvg } from 'assets/svg/save_white.svg';
import userContext from 'common/contexts/UserContext';
import TextField from 'components/design-system/TextField';
import InputComponent from 'components/Register/Input';
import PrivateBarLayout from 'layouts/PrivateBar';

const EditInfoContainer = () => {
  const history = useHistory();
  const { user } = useContext(userContext);

  return (
    <div className="min-h-screen h-full flex flex-col">
      <PrivateBarLayout />
      <div style={{ background: 'rgb(250,250,250)' }} className="pt-3 flex flex-col justify-start flex-1 pb-20">
        <div className="container">
          <button
            onClick={() => history.push('/profil/reglages')}
            className="flex items-center mb-5 focus:ring-0 focus:outline-none"
          >
            <ArrowLeftSvg />
            <span className="text-sm mt-1 ml-3 text-lena-blue-dark">Retour</span>
          </button>
          <div className="flex flex-col items-center mb-7">
            <h2 className="font-bold text-lena-pink-dark uppercase mt-3">Modifier mes infos</h2>
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
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0">
        <button
          className={`focus:ring-0 focus:outline-none w-full 
          bg-lena-pink-dark hover:bg-lena-pink-darkest text-white py-3
        text-center font-bold text-lg flex justify-center`}
        >
          <SaveSvg />
          <span className="ml-5">Enregistrer</span>
        </button>
      </div>
    </div>
  );
};

export default EditInfoContainer;
