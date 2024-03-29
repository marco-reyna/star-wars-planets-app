export interface IPlanet {
  name: string;
  diameter: number;
  climate: string;
  terrain: string;
  population: number;
  residents: string[];
  selectedPlanetName: string;
  remove: (name: string) => void;
  select: ({}: IPlanet) => void;
  showResidents: (name: string, planetResidents: string[]) => void;
}

export interface IPlanetsState {
  planets: IPlanet[];
  nextPage: string;
  prevPage: string;
  residentName: string;
  residents: string[];
  planetsList: IPlanet[];
}

export interface IPlanetsActions {
  fetchPlanets: (url: string) => Promise<void>;
  fetchResidentsNames: (url: string) => Promise<void>;
  addResidentName: (url: string) => void;
  clearResidentsList: () => void;
  selectPlanet: (list: IPlanet[]) => void;
  removePlanet: (list: IPlanet[]) => void;
}
