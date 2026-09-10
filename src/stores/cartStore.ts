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
  clear: (options?: { silent?: boolean } | boolean) => void;
  hydrated: boolean;
  setHydrated: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const cartStorageKey = "cart";

const useCart = create<cartType>()((set, get) => ({
  courses: [],
  hydrated: false,
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  setHydrated: () => {
    if (typeof window !== "undefined") {
      let courses: CourseType[] = [];
      try {
        courses = JSON.parse(getItem(cartStorageKey)) || [];
      } catch {
        removeItem(cartStorageKey);
      }

      set(() => ({
        courses,
        hydrated: true,
      }));
    }
  },
  add: (course: CourseType) => {
    if (get().courses.find((c) => String(c.id) === String(course.id)))
      return toast.warning(lang.fa.ui.alreadyInCart);
    set(() => ({
      courses: [...get().courses, course],
    }));
    setItem(cartStorageKey, JSON.stringify(get().courses));
    return toast.success(lang.fa.ui.addedToCart);
  },
  remove: (id) => {
    set(() => ({
      courses: get().courses.filter((course) => String(course.id) !== id),
    }));
    setItem(cartStorageKey, JSON.stringify(get().courses));
    toast.success(lang.fa.ui.removedFromCart);
  },
  clear: (arg?: { silent?: boolean } | boolean) => {
    const silent = typeof arg === "boolean" ? arg : Boolean(arg?.silent);
    set(() => ({ courses: [] }));
    removeItem(cartStorageKey);
    if (!silent) {
      toast.success(lang.fa.ui.cartCleared);
    }
  },
}));

export default useCart;
