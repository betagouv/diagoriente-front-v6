import React, { FunctionComponent } from 'react';
import { ReactComponent as ArrowSvg } from 'assets/images/svg/picto/arrow-left.svg';
import { useHistory } from 'react-router-dom';

const NavBackButton: FunctionComponent<{ onBack?: () => void }> = ({ onBack }) => {
  const history = useHistory();

  const handleGoBack = () => {
    if (onBack) onBack();
    else history.goBack();
  };

  return (
    <button className="flex items-center space-x-2 focus:outline-none focus:ring-0" onClick={handleGoBack}>
      <ArrowSvg />
      <span className="mt-1 text-lena-blue-dark">Retour</span>
    </button>
  );
};

export default NavBackButton;
