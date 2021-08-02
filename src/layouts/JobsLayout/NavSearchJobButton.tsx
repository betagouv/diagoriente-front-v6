import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as SearchSvg } from 'assets/svg/search.svg';

const NavSearchJobButton: FunctionComponent = () => {
  const history = useHistory();

  return (
    <button
      className="focus:ring-0 focus:outline-none flex items-center space-x-3"
      onClick={() => history.push('/metiers/recherche')}
    >
      <SearchSvg fill="#223A7A" />
      <div className="mt-1 text-lena-blue-dark">Rechercher un métier</div>
    </button>
  );
};

export default NavSearchJobButton;
