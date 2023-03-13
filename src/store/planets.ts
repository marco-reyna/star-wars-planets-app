import axios from 'axios';
import { create } from 'zustand';
import { IPlanet, IPlanetsState, IPlanetsActions } from '../types/index';
import { persist, createJSONStorage } from 'zustand/middleware'

const usePlanetsStore = create<IPlanetsState & IPlanetsActions>()(
  persist(
    (set, get) => ({
      planets: [],
      nextPage: '',
      prevPage: '',
      residentName: '',
      residents: [],
      planetsList: [],
      fetchPlanets: async (url: string) => {
        const response = await axios(url);
        const planets: IPlanet[] = response.data.results;
        const nextPage: string = response.data.next;
        const prevPage: string = response.data.previous;
        set((state) => ({...state, planets, nextPage, prevPage}));
      },
      fetchResidentsNames: async (urls: string) => {
        const response = await axios(urls);
        const residentName: string = response.data.name;
        const { addResidentName } = get();
        set((state) => ({...state, residentName}));
        addResidentName(residentName);
      },
      addResidentName(name: string) {
        const { residents } = get();
        const newArr = [...residents, name];
        set((state) => ({...state, residents: newArr}));
      },
      clearResidentsList() {
        set((state) => ({...state, residents: get().residents = []}));
      },
      selectPlanet(list: IPlanet[]) {
        set((state) => ({...state, planetsList: list}));
      },
      removePlanet(list: IPlanet[]) {
        set((state) => ({...state, planetsList: get().planetsList = list}));

      },
    }),
    {
      name: 'planet-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)

export default usePlanetsStore;