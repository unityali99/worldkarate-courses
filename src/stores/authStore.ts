import { create } from "zustand";
import { get as getItem, set as setItem, remove } from "local-storage";
import ApiClient from "@/services/ApiClient";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/getErrorMessage";
import UserType from "@/schemas/UserType";

type LoginState = {
  user: UserType | null;
  login: (user: UserType) => void;
  logout: () => void;
};

export const cookieKey = "auth-token";
export const userStorageKey = "user";

function getStoredUser() {
  try {
    return JSON.parse(getItem(userStorageKey)) || null;
  } catch {
    remove(userStorageKey);
    return null;
  }
}

const useAuth = create<LoginState>()((set, get) => ({
  user: getStoredUser(),
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
      .catch((error) => toast.error(getErrorMessage(error, "خروج با خطا روبه‌رو شد")));
  },
}));

export default useAuth;
