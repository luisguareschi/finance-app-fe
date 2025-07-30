import { create } from "zustand";

interface IStoreState {
  showSidebar: boolean;
}

interface IStoreActions {
  setShowSidebar: (show: boolean) => void;
}

const initialState: IStoreState = {
  showSidebar: false,
};

const useStore = create<IStoreState & IStoreActions>()((set) => ({
  ...initialState,
  setShowSidebar: (show) => set({ showSidebar: show }),
}));

export default useStore;
