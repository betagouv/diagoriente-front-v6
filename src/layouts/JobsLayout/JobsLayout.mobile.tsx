import React, { FunctionComponent } from 'react';
import MobileHeaderGeneric from '../MobileHeaderGeneric';
import NavSearchJobButton from './NavSearchJobButton';
import NavBackButton from '../../components/design-system/NavBackButton';

const JobsLayoutForMobile: FunctionComponent<{ headerMode?: 'back' | 'search_jobs'; onBack?: () => void }> = ({
  headerMode,
  onBack,
  children,
}) => {
  const renderLeftNav = () => {
    switch (headerMode) {
      case 'search_jobs':
        return <NavSearchJobButton />;
      case 'back':
        return <NavBackButton onBack={onBack} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <MobileHeaderGeneric left={renderLeftNav()} />
      <div className="flex flex-col flex-1">{children}</div>
    </div>
  );
};

export default JobsLayoutForMobile;
