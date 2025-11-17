import { create } from "zustand";
import { get as getItem, set as setItem, remove } from "local-storage";
import ApiClient from "@/services/ApiClient";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

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
    ApiClient.logout()
      .then((res) => {
        toast.success(res.data.message as string);
        window.location.replace("/");
      })
      .catch((error: AxiosError) => toast.error(error.message));
  },
}));

export default useAuth;
