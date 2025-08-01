import { create } from "zustand";

interface IStoreState {
  showSidebar: boolean;
  navbarTitle: string;
}

interface IStoreActions {
  setShowSidebar: (show: boolean) => void;
  setNavbarTitle: (title: string) => void;
}

const initialState: IStoreState = {
  showSidebar: false,
  navbarTitle: "Welcome!",
};

const useStore = create<IStoreState & IStoreActions>()((set) => ({
  ...initialState,
  setShowSidebar: (show) => set({ showSidebar: show }),
  setNavbarTitle: (title) => set({ navbarTitle: title }),
}));

export default useStore;
