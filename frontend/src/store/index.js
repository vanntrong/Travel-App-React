import create from "zustand";

const useStore = create((set) => ({
  pins: [],
  filter: {
    category: "",
    rating: 0,
  },
  setPins: (payload) => set({ pins: payload }),
  setFilterCategory: (payload) => set((state) => (state.filter.category = payload)),
  setFilterRating: (payload) => set((state) => (state.filter.rating = payload)),
}));

export default useStore;
