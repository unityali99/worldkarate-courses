import { create } from "zustand";

interface State {
  // menuToggled: boolean;
  // toggleMenu: () => void;
}

const useBearStore = create<State>((set) => ({
  // menuToggled: false,
  // toggleMenu: () => set((state) => ({ menuToggled: !state.menuToggled })),
}));

export default useBearStore;
