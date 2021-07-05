import React, { FunctionComponent } from 'react';
import ParcoursLayoutForMobile from './ParcoursLayout.mobile';

type Props = {
  withRange?: boolean;
  backgroundColor?: string;
};

const ParcoursLayout: FunctionComponent<Props> = ({ withRange, backgroundColor, children }) => {
  return (
    <ParcoursLayoutForMobile backgroundColor={backgroundColor} withRange={withRange}>
      {children}
    </ParcoursLayoutForMobile>
  );
};

export default ParcoursLayout;
