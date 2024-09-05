import { CourseType } from "@/schemas/Course";
import { create } from "zustand";
import {
  get as getItem,
  set as setItem,
  remove as removeItem,
} from "local-storage";

type cartType = {
  courses: CourseType[];
  add: (course: CourseType) => void;
  remove: (id: string) => void;
  clear: () => void;
};

export const cartStorageKey = "cart";

const useCart = create<cartType>()((set, get) => ({
  courses: JSON.parse(getItem(cartStorageKey)) || [],
  add: (course: CourseType) => {
    set(() => ({
      courses: [...get().courses, course],
    }));
    setItem(cartStorageKey, JSON.stringify(get().courses));
  },
  remove: (id) => {
    set(() => ({
      courses: get().courses.filter((course) => course.id !== id),
    }));
    setItem(cartStorageKey, JSON.stringify(get().courses));
  },
  clear: () => {
    set(() => ({ courses: [] }));
    removeItem(cartStorageKey);
  },
}));

export default useCart;
