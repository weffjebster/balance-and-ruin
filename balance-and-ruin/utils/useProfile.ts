import { User } from '~/types';

export type UseProfileResult = {
  user: User;
  setUser: (user: User) => void;
};

/** return auth profile for current user */
export const useProfile = () => {
  return {
    user: {} as User,
    setUser: (user) => {}
  } as UseProfileResult;
};
