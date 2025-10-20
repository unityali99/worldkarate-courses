import { CourseType } from "@/schemas/Course";
import { create } from "zustand";
import {
  get as getItem,
  set as setItem,
  remove as removeItem,
} from "local-storage";
import { toast } from "react-toastify";
import { lang } from "@/lang";

type cartType = {
  courses: CourseType[];
  add: (course: CourseType) => void;
  remove: (id: string) => void;
  clear: () => void;
  hydrated: boolean;
  setHydrated: () => void;
};

export const cartStorageKey = "cart";

const useCart = create<cartType>()((set, get) => ({
  courses: [],
  hydrated: false,
  setHydrated: () => {
    if (typeof window !== "undefined") {
      set(() => ({
        courses: JSON.parse(getItem(cartStorageKey)) || [],
        hydrated: true,
      }));
    }
  },
  add: (course: CourseType) => {
    if (get().courses.find((c) => c.id === course.id))
      return toast.warning(lang.fa.ui.alreadyInCart);
    set(() => ({
      courses: [...get().courses, course],
    }));
    setItem(cartStorageKey, JSON.stringify(get().courses));
    return toast.success(lang.fa.ui.addedToCart);
  },
  remove: (id) => {
    set(() => ({
      courses: get().courses.filter((course) => course.id !== id),
    }));
    setItem(cartStorageKey, JSON.stringify(get().courses));
    toast.success(lang.fa.ui.removedFromCart);
  },
  clear: () => {
    set(() => ({ courses: [] }));
    removeItem(cartStorageKey);
    toast.success(lang.fa.ui.cartCleared);
  },
}));

export default useCart;
