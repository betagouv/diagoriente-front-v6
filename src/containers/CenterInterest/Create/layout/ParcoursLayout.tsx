import React, { FunctionComponent } from 'react';
import useMediaQuery from "hooks/useMediaQuery";
import ParcoursLayoutForMobile from './ParcoursLayout.mobile';
import ParcoursLayoutForDesktop from "./ParcoursLayout.desktop";

type Props = {
  withRange?: boolean;
  withMobile?: boolean;
  backgroundColor?: string;
};

const ParcoursLayout: FunctionComponent<Props> = ({ withRange, withMobile = true, backgroundColor, children }) => {
  const isDesktop = useMediaQuery('md');

  return isDesktop ? (
    <ParcoursLayoutForDesktop>{children}</ParcoursLayoutForDesktop>
  ) : withMobile ? (
    <ParcoursLayoutForMobile backgroundColor={backgroundColor} withRange={withRange}>{children}</ParcoursLayoutForMobile>
  ) : (
    <div>{children}</div>
  )
};

export default ParcoursLayout;
