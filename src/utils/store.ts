import { create } from "zustand";
import { get as getItem, set as setItem, remove } from "local-storage";

type User = {
  email: string;
  firstName: string;
  lastName: string;
};

type LoginState = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

export const cookieKey = "auth-token";
export const userStorageKey = "user";

const useAuth = create<LoginState>()((set, get) => ({
  user: JSON.parse(getItem(userStorageKey)),
  login: (user) => {
    setItem(userStorageKey, JSON.stringify(user));
    set(() => ({ user }));
  },
  logout: () => {
    remove(userStorageKey);
    set(() => ({ user: null }));
  },
}));

export default useAuth;
