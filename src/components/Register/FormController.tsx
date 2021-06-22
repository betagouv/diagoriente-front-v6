import React, { FunctionComponent } from "react";

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

export default { FormControl, FormLabel };
