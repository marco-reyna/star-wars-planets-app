import axios from 'axios';
import { create } from 'zustand';
import { IPlanet, IPlanetsState } from '../types/index';

const usePlanetsStore = create<IPlanetsState>()((set, get) => ({
  planets: [],
  nextPage: '',
  prevPage: '',
  residentName: '',
  residents: [],
  fetchPlanets: async (url: string) => {
    const response = await axios(url);
    const planets: IPlanet[] = response.data.results
    const nextPage: string = response.data.next
    const prevPage: string = response.data.previous
    set((state) => ({
      ...state,
      planets,
      nextPage,
      prevPage,
    }));
  },
  fetchResidentsNames: async (urls: string) => {
    const response = await axios(urls);
    const residentName: string = response.data.name;
    const { addResidentName } = get()
    set((state) => ({
      ...state,
      residentName,
    }));
    addResidentName(residentName)
  },
  addResidentName(name: string) {
    const { residents } = get()
    residents.push(name)
    set(() => ({
      residents,
    }));
  },
  clearResidentsList() {
    const { residents } = get()
    set(() => ({
      residents: [] = []
    }));
  }
}))

export default usePlanetsStore;