import React, { ReactComponentElement } from "react";
import { ReactComponent as SearchSvg } from 'assets/svg/search.svg';
import { ReactComponent as UserSvg } from "assets/svg/user_profile.svg";
import ListSvg from "assets/svg/list.svg";
import { ReactComponent as ChevronRightSvg } from 'assets/svg/chevron_right.svg';

type ButtonFilterProps = {
  icon?: string;
  title: string;
};

const ButtonFilter: React.FC<ButtonFilterProps> = ({ icon, title  }) => {
  return (
    <button className="border-2 border-lena-blue-lightest py-4 px-4 w-full rounded-md flex justify-between items-center mb-3" style={{  }}>
      <div className="flex items-center space-x-3">
        {icon && (
          <img src={icon} alt="Svg" />
        )}
        <span className="text-lena-blue-dark">
          {title}
        </span>
      </div>
      <ChevronRightSvg />
    </button>
  );
};

const SearchJob = () => {
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
            <input
              placeholder="test"
              className="w-full bg-transparent focus:ring-0 focus:outline-none py-3 ml-3"
            />
          </div>
          <div>
            <ButtonFilter icon={ListSvg} title="Domain d'activité" />
            <ButtonFilter title="Type de métier" />
            <ButtonFilter title="Niveau d'accès" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchJob;