import { create } from "zustand";

interface IStoreState {
  showSidebar: boolean;
  navbarConfig: {
    title: string;
    backButton?: boolean;
  };
}

interface IStoreActions {
  setShowSidebar: (show: boolean) => void;
  setNavbarConfig: (config: IStoreState["navbarConfig"]) => void;
}

const initialState: IStoreState = {
  showSidebar: false,
  navbarConfig: {
    title: "Welcome!",
    backButton: false,
  },
};

const useStore = create<IStoreState & IStoreActions>()((set) => ({
  ...initialState,
  setShowSidebar: (show) => set({ showSidebar: show }),
  setNavbarConfig: (config) => set({ navbarConfig: config }),
}));

export default useStore;
