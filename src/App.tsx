import { useEffect } from "react";
import usePlanetsStore from "./store/planets";
import { IPlanet } from './types/index';
function App(): JSX.Element {
  const planets = usePlanetsStore((state) => state.planets);
  const { fetchPlanets } = usePlanetsStore();
  
  useEffect(() => {
    fetchPlanets();
  }, []);

  return (
    <>
      <ul>
        {planets.map((planet: IPlanet) => (
          <li key={planet.name}>
            <p>{planet.name}</p>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App;