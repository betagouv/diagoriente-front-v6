import { useState } from 'react';
import { User, UserParcour } from 'common/requests/types';
import { useDidMount } from 'common/hooks/useLifeCycle';
import startup from 'common/utils/startup';
import { useThemes } from 'common/requests/themes';

const useRoot = () => {
  const [startupEnd, setStartupEnd] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [parcours, setParcours] = useState<UserParcour | null>(null);
  const secteursData = useThemes({ variables: { type: 'secteur' } });
  useDidMount(() => {
    startup().then((data) => {
      if (data) {
        setUser(data.user);
        setParcours(data.parcours);
      }
      setStartupEnd(true);
    });
  });

  return {
    startupEnd, user, setUser, parcours, setParcours, secteursData,
  };
};

export default useRoot;
