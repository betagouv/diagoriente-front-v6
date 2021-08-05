import React, { FunctionComponent } from 'react';
import ProfileLayout from 'layouts/ProfileLayout/ProfileLayout';
import { ReactComponent as HeartSvg } from 'assets/svg/picto_interets.svg';
import { Link } from 'react-router-dom';
import { useMyInterests } from 'common/requests/interests';
import { useDidMount } from 'common/hooks/useLifeCycle';
import AppLoader from 'components/ui/AppLoader';
import Button from 'components/design-system/Button';
import classNames from 'common/utils/classNames';
import useMediaQuery from 'hooks/useMediaQuery';
import InterestItem from './components/InterestItem';

const MyInterestsContainer: FunctionComponent = () => {
  const [fetchMyInterests, myInterestsState] = useMyInterests();
  const isDesktop = useMediaQuery('md');

  useDidMount(() => {
    fetchMyInterests();
  });

  return (
    <ProfileLayout>
      <div className="flex flex-col items-center justify-center space-y-12 py-8 container">
        {isDesktop && (
          <div className="flex flex-col items-center justify-center space-y-2">
            <HeartSvg />
            <h2 className="font-bold text-lena-blue-dark uppercase">Mes centres d'intérêt</h2>
          </div>
        )}
        {myInterestsState.loading && <AppLoader />}
        {myInterestsState.data && (
          <div
            className={classNames(
              'divide-y divide-lena-blue-alt-light',
              ' md:grid lg:grid-cols-2 md:gap-4 lg:px-48 w-full lg:w-auto',
            )}
          >
            {myInterestsState.data.me.interests.map((v) =>
              v.cursors.map((w) => <InterestItem title={w.title} id={w.id} />),
            )}
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
