import axios from 'axios';
import { create } from 'zustand';
import { IPlanet, IPlanetsState } from '../types/index';
import { persist, createJSONStorage } from 'zustand/middleware'

const usePlanetsStore = create<IPlanetsState>()(
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
        set(() => ({
          residents: [] = []
        }));
      },
      selectPlanet(planet: IPlanet) {
        const { planetsList } = get()
        if (planetsList.includes(planet)) {
          alert("Planet already selected");
        } else {
          planetsList.push(planet)
          console.log(planetsList)
          set(() => ({
            planetsList,
          }));
        }
      },
      removePlanet(name: string) {
        const { planetsList } = get()
        const list = planetsList.filter((planet, index) => {
          return planet.name !== name
        });
        set((state) => ({
          ...state,
          planetsList: list,
        }));
      }
    }),
    {
      name: 'planet-storage',
      storage: createJSONStorage(() => sessionStorage), 
    }
  )
)

export default usePlanetsStore;