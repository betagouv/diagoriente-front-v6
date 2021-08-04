import React, { FunctionComponent } from 'react';
import ProfileLayout from 'layouts/ProfileLayout/ProfileLayout';
import { ReactComponent as HeartSvg } from 'assets/svg/picto_interets.svg';
import { Link } from 'react-router-dom';
import { useMyInterests } from 'common/requests/interests';
import { useDidMount } from 'common/hooks/useLifeCycle';
import InterestItem from './components/InterestItem';
import AppLoader from '../../../components/ui/AppLoader';
import Button from '../../../components/design-system/Button';

const MyInterestsContainer: FunctionComponent = () => {
  const [fetchMyInterests, myInterestsState] = useMyInterests();

  useDidMount(() => {
    fetchMyInterests();
  });

  return (
    <ProfileLayout>
      <div className="flex flex-col items-center justify-center space-y-12 py-8 container">
        <div className="flex flex-col items-center justify-center space-y-2">
          <HeartSvg />
          <h2 className="font-bold text-lena-blue-dark uppercase">Mes centres d'intérêt</h2>
        </div>
        {myInterestsState.loading && <AppLoader />}
        {myInterestsState.data && (
          <div className="divide-y divide-lena-blue-alt-light md:grid lg:grid-cols-2 md:gap-4 lg:px-48">
            <InterestItem title="Gérer le marketing et piloter l’image" id="123" />
            <InterestItem title="Concevoir des contenus, des supports de communication" id="123" />
            <InterestItem title="Créer un projet entrepeunarial" id="123" />
            <InterestItem title="Décider" id="123" />
          </div>
        )}
        <div>
          <Button variant="primary" size="md" mobileStacked>
            <Link to="/centres_interet/create">Modifier mes centres d'intérêt</Link>
          </Button>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default MyInterestsContainer;
