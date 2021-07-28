import React, { FunctionComponent } from 'react';
import { ReactComponent as DeleteSvg } from '../../../../assets/svg/delete.svg';

const InterestItem: FunctionComponent<{ title: string; id: string }> = ({ id, title }) => {
  return (
    <div
      key={id}
      className="md:bg-lena-gray-light-2 flex flex-row items-start justify-between p-4 md:rounded-lg md:font-bold space-x-8"
    >
      <div>{title}</div>
      <button className="outline-none focus:outline-none focus:ring-0">
        <DeleteSvg />
      </button>
    </div>
  );
};

export default InterestItem;
