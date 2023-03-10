import axios from 'axios';
import { create } from 'zustand';
import { IPlanet } from '../types/index';

const baseURL = 'https://swapi.dev/api/planets'

type PlanetsState = {
  planets: IPlanet[]
  fetchPlanets: () => Promise<void>
}

const usePlanetsStore = create<PlanetsState>()((set) => ({
  planets: [],
  fetchPlanets: async () => {
    const response = await axios(baseURL);
    set({planets: response.data.results});
  }
}))

export default usePlanetsStore;