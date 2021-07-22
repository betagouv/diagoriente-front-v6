import React, { ReactComponentElement, useState } from 'react';
import { ReactComponent as SearchSvg } from 'assets/svg/search.svg';
import { ReactComponent as UserSvg } from 'assets/svg/user_profile.svg';
import ListSvg from 'assets/svg/list.svg';
import { ReactComponent as ChevronRightSvg } from 'assets/svg/chevron_right.svg';
import { useHistory } from 'react-router-dom';
import classNames from 'common/utils/classNames';
import DomainActivity, { DomainActivityType } from '../../TopJobContainer/containers/DomainActivity';

const SearchModal = () => {
  return <div>lol</div>;
};

type ButtonFilterProps = {
  icon?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonFilter: React.FC<ButtonFilterProps> = ({ icon, title, children, ...rest }) => {
  return (
    <button
      className="border-2 border-lena-blue-lightest py-4 px-4 w-full rounded-md flex justify-between items-center mb-3"
      style={{ boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.15)' }}
      {...rest}
    >
      <div className="flex items-center space-x-3 overflow-ellipsis overflow-hidden whitespace-nowrap">
        {icon && <img src={icon} alt="Svg" />}
        <span className="text-lena-blue-dark text-left overflow-ellipsis overflow-hidden whitespace-nowrap">
          {children}
        </span>
      </div>
      <div>
        <ChevronRightSvg />
      </div>
    </button>
  );
};

const Search = () => {
  const history = useHistory();
  const [showDomainActivity, setShowDomainActivity] = useState(false);
  const [selectedDomainActivity, setSelectedDomainActivity] = useState<Array<DomainActivityType>>();

  const handleParseDomainActivity = () => {
    const domainsString: Array<string> = [];
    const map = selectedDomainActivity?.map((e) => domainsString.push(e.title));
    return domainsString.join();
  };

  if (showDomainActivity) {
    return (
      <DomainActivity
        domains={selectedDomainActivity}
        onValid={(data) => setSelectedDomainActivity(data)}
        onClose={() => setShowDomainActivity(false)}
      />
    );
  }

  return (
    <div>
      <header className="bg-lena-blue-darkest py-3 bg-opacity-50">
        <div className="flex container flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <SearchSvg fill="#fff" />
            <span className="inline-block mt-1 text-white text-sm">Rechercher un métier</span>
          </div>
          <button>
            <UserSvg />
          </button>
        </div>
      </header>
      <div className="mt-5 container">
        <div>
          <div className="w-full border border-lena-gray-light px-2 flex bg-white rounded-md flex items-center mb-5">
            <SearchSvg fill="#C9C9C7" />
            <input placeholder="test" className="w-full bg-transparent focus:ring-0 focus:outline-none py-3 ml-3" />
          </div>
          <div>
            <ButtonFilter onClick={() => setShowDomainActivity(true)} icon={ListSvg}>
              {selectedDomainActivity ? <strong>{handleParseDomainActivity()}</strong> : <>Domain d'activité</>}
            </ButtonFilter>
            <ButtonFilter>Type de métier</ButtonFilter>
            <ButtonFilter>Niveau d'accès</ButtonFilter>
          </div>
        </div>
        <div className="fixed bottom-10 left-10 right-10 md:relative">
          <button
            disabled={!(selectedDomainActivity && selectedDomainActivity?.length > 0)}
            onClick={() => history.push('/metiers/recherche/resultats')}
            className={classNames(
              `focus:ring-0 focus:outline-none w-full
                    text-white py-3 text-center font-bold
                    text-lg md:w-72 md:rounded-lg rounded-md`,
              selectedDomainActivity && selectedDomainActivity?.length > 0 ? 'bg-lena-blue' : 'bg-lena-blue-inter',
            )}
          >
            Rechercher
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
