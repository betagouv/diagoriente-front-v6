import React from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as HeartSvg } from 'assets/svg/heart.svg';
import { ReactComponent as ArrowLeftSvg } from 'assets/images/svg/picto/arrow-left.svg';
import { ReactComponent as DeleteSvg } from 'assets/svg/delete.svg';
import PrivateBarLayout from 'layouts/PrivateBar';

const CenterInterestContainer = () => {
  const history = useHistory();
  return (
    <div className="min-h-screen h-full flex flex-col">
      <PrivateBarLayout />
      <div style={{ background: 'rgb(250,250,250)' }} className="pt-3 flex flex-col justify-start flex-1 pb-20">
        <div className="container">
          <button onClick={() => history.push('/')} className="flex items-center mb-5 focus:ring-0 focus:outline-none">
            <ArrowLeftSvg />
            <span className="text-sm mt-1 ml-3 text-lena-blue-dark">Retour</span>
          </button>
          <div className="flex flex-col items-center mb-3">
            <HeartSvg />
            <h2 className="font-bold text-lena-blue-dark mb-10 uppercase mt-3">Mes centres d'intérêt</h2>
          </div>
          <div>
            <div className="flex border-b border-lena-blue-light pb-3 mb-3">
              <span className="block flex-grow">Gérer le marketing et piloter l'image </span>
              <button>
                <DeleteSvg />
              </button>
            </div>
            <div className="flex border-b border-lena-blue-light pb-3 mb-3">
              <span className="block flex-grow mr-5">Concevoir des contenus, des supports de communication</span>
              <button>
                <DeleteSvg />
              </button>
            </div>
            <div className="flex border-b border-lena-blue-light pb-3 mb-3">
              <span className="block flex-grow mr-5">Créer un projet entrepreneurial</span>
              <button>
                <DeleteSvg />
              </button>
            </div>
            <div className="flex border-b border-lena-blue-light pb-3 mb-3">
              <span className="block flex-grow mr-5">Décider</span>
              <button>
                <DeleteSvg />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 md:relative">
        <button className="focus:ring-0 focus:outline-none w-full bg-lena-pink-dark hover:bg-lena-pink-darkest text-white py-3 text-center font-bold text-lg md:w-72 md:rounded-lg">
          Modifier mes centres d'intérêt
        </button>
      </div>
    </div>
  );
};

export default CenterInterestContainer;
