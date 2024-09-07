import { CourseType } from "@/schemas/Course";
import { create } from "zustand";
import {
  get as getItem,
  set as setItem,
  remove as removeItem,
} from "local-storage";
import { toast } from "react-toastify";

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
    if (get().courses.find((c) => c.id === course.id))
      return toast.warning("قبلا در سبد خرید اضافه شده است");
    set(() => ({
      courses: [...get().courses, course],
    }));
    setItem(cartStorageKey, JSON.stringify(get().courses));
    return toast.success("با موفقیت به سبد خرید اضافه شد");
  },
  remove: (id) => {
    set(() => ({
      courses: get().courses.filter((course) => course.id !== id),
    }));
    setItem(cartStorageKey, JSON.stringify(get().courses));
    toast.success("با موفقیت از سبد خرید حذف شد");
  },
  clear: () => {
    set(() => ({ courses: [] }));
    removeItem(cartStorageKey);
    toast.success("سبد خرید با موفقیت خالی شد");
  },
}));

export default useCart;
