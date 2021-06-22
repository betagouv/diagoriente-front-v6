import React, { FunctionComponent } from "react";

const FormComment: FunctionComponent<React.HTMLProps<HTMLDivElement>> = ({ children }) => {
  return (
    <div className="flex-grow lg:max-w-58p lg:w-58p md:w-69p md:max-w-69p">
      <div className="flex relative items-center">
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default FormComment;
