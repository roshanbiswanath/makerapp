import { create } from 'zustand';

interface CityState {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
}

export const useCityStore = create<CityState>((set) => ({
  selectedCity: 'Select Location',
  setSelectedCity: (city) => set({ selectedCity: city }),
}));