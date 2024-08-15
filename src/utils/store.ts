import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import { persist } from "zustand/middleware";
import { get as getItem, set as setItem, remove } from "local-storage";

type User = {
  email: string;
  firstName: string;
  lastName: string;
};

type LoginState = {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
};

export const storageKey = "auth-token";

const useAuth = create<LoginState>()(
  persist(
    (set, get) => ({
      user: getItem(storageKey) ? jwtDecode(getItem(storageKey)) : null,
      login: (token) => {
        setItem(storageKey, token);
        set(() => ({ user: jwtDecode(token)!, loading: false }));
      },
      logout: () => {
        remove(storageKey);
        set(() => ({ user: null }));
      },
    }),
    { name: "auth-store", skipHydration: true }
  )
);

export default useAuth;
