import { useEffect, useState } from 'react';
import usePlanetsStore from './store/planets';
import PlanetCard from './components/PlanetCard';
import { IPlanet } from './types/index';
import { shallow } from 'zustand/shallow'

function App(): JSX.Element {
  const { planets, nextPage, prevPage } = usePlanetsStore(state => ({
    planets: state.planets,
    nextPage: state.nextPage,
    prevPage: state.prevPage
  }), shallow);
  const { fetchPlanets } = usePlanetsStore();

  const [URL, setURL] = useState<string>('https://swapi.dev/api/planets/?page=1');
  
  useEffect(() => {
    fetchPlanets(URL);
  }, []);

  function prev() {
    setURL(prevPage);
    fetchPlanets(URL);
  }

  function next() {
    setURL(nextPage);
    fetchPlanets(URL);
  }

  return (
    <>
      <button onClick={prev}>
        PREV
      </button>
      <button onClick={next}>
        NEXT
      </button>
      {planets.map((planet: IPlanet, i: number) => (
        <PlanetCard
          key={i}
          name={planet.name}
          diameter={planet.diameter * 6378.16}
          climate={planet.climate}
          terrain={planet.terrain}
          population={planet.population}
          residents={planet.residents}
        />
      ))}
    </>
  )
}

export default App;