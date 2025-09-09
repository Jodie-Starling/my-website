import { create } from 'zustand';

interface WeatherState {
  lastCity: string;
  setLastCity: (city: string) => void;
}

export const useWeatherStore = create<WeatherState>((set) => ({
  lastCity: '',
  setLastCity: (city) => set({ lastCity: city }),
}));