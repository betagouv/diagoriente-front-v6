import React, { FunctionComponent } from 'react';

const Pill: FunctionComponent = ({ children }) => {
  return <div className="bg-lena-blue-lightest text-lena-blue-dark rounded-full px-3 py-1 text-center">{children}</div>;
};

export default Pill;
