import React, { FunctionComponent } from 'react';
import classesNames from 'common/utils/classNames';

export const FormControl: FunctionComponent = ({ children }) => {
  return (
    <div className="w-full m-0 md:flex md:items-center md:justify-center">
      <div className="w-full md:flex md:flex-wrap">{children}</div>
    </div>
  );
};

export const FormLabel: FunctionComponent<React.HTMLProps<HTMLLabelElement>> = ({ children }) => {
  return (
    <div className="md:flew-grow md:text-right md:place-self-center lg:max-w-41p lg:w-41p md:max-w-30p md:w-30p">
      <div className="font-bold items-end mr-4">{children}</div>
    </div>
  );
};
export const FormControlReco: FunctionComponent = ({ children }) => {
  return (
    <div className="w-full m-0 flex flex-col">
      <div className="w-full flex flex-col">{children}</div>
    </div>
  );
};
export const FormLabelReco: FunctionComponent<React.HTMLProps<HTMLLabelElement>> = ({ children, className }) => {
  return (
    <div className="text-left">
      <div className={classesNames('font-bold items-end mr-4', className)}>{children}</div>
    </div>
  );
};

export default { FormControl, FormControlReco, FormLabel, FormLabelReco };
