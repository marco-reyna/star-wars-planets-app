export interface IPlanet {
  name: string;
  diameter: number;
  climate: string;
  terrain: string;
  population: number;
  residents: string[];
  remove: (name: string) => void;
}

export interface IPlanetsState {
  planets: IPlanet[];
  nextPage: string;
  prevPage: string;
  residentName: string;
  residents: string[];
  fetchPlanets: (url: string) => Promise<void>;
  fetchResidentsNames: (url: string) => Promise<void>;
  addResidentName: (url: string) => void;
  clearResidentsList: () => void;
}