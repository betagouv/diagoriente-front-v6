import { useContext, useEffect } from 'react';
import UserContext from 'common/contexts/UserContext';
import localforage from 'localforage';
import { User } from 'common/requests/types';

const useUpdateUserdata = (newData: User | undefined) => {
  const { setUser } = useContext(UserContext);
  async function data() {
    const token: string | null = await localforage.getItem('auth');
    const res = {};
    if (token) {
      const parsedToken = JSON.parse(token);
      let newObj = {};
      const objUser = newData;
      newObj = {
        token: parsedToken.token,
        user: objUser,
      };
      localforage.setItem('auth', JSON.stringify(newObj));
      if (objUser) {
        setUser(objUser);
      }
    }
    return res;
  }
  useEffect(() => {
    if (newData) {
      data();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newData]);
};
export default useUpdateUserdata;
