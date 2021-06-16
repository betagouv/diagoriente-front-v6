import { createContext } from 'react';
import { UserParcour } from 'common/requests/types';

export default createContext <{ parcours: UserParcour | null; setParcours:(parcours: UserParcour | null) => void }>({
  parcours: null,
  setParcours: () => {},
});
