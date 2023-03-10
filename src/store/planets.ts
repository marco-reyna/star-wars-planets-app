import axios from 'axios';
import { create } from 'zustand';
import { IPlanet } from '../types/index';

type PlanetsState = {
  planets: IPlanet[]
  nextPage: string
  prevPage: string
  residentName: string
  fetchPlanets: (url: string) => Promise<void>
  fetchResidentsNames: (url: string) => Promise<void>
}

const usePlanetsStore = create<PlanetsState>()((set) => ({
  planets: [],
  nextPage: '',
  prevPage: '',
  residentName: '',
  fetchPlanets: async (url) => {
    const response = await axios(url);
    const planets: IPlanet[] = response.data.results
    const nextPage: string = response.data.next
    const prevPage: string = response.data.previous
    set(state => ({
      ...state,
      planets,
      nextPage,
      prevPage,
    }));
  },
  fetchResidentsNames: async (url) => {
    const response = await axios(url);
    const residentName: string = response.data.name;
    set(state => ({
      ...state,
      residentName,
    }));
    console.log(residentName);
  }
}))

export default usePlanetsStore;