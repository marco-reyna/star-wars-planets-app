import { useEffect, useState } from 'react';
import usePlanetsStore from './store/planets';
import PlanetCard from './components/PlanetCard';
import { IPlanet } from './types/index';
import { shallow } from 'zustand/shallow'

function App(): JSX.Element {
  const { planets, nextPage, prevPage, planetsList } = usePlanetsStore(state => ({
    planets: state.planets,
    nextPage: state.nextPage,
    prevPage: state.prevPage,
    planetsList: state.planetsList
  }), shallow);
  const { fetchPlanets, selectPlanet, removePlanet } = usePlanetsStore();

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

  function addNewPlanet() {
    const planet: IPlanet = {
      name: '',
      diameter: 0,
      climate: '',
      terrain: '',
      population: 0,
      residents: [],
      remove: () => {},
    }
    selectPlanet(planet)
  }

  function select(planet: IPlanet) {
    selectPlanet(planet)
  }
  function remove(name: string) {
    removePlanet(name)
  }

  return (
    <>
      <button onClick={prev}>
        PREV
      </button>

      <div style={{display: 'flex', width: '700px', justifyContent: 'space-between'}}>
        {planets.map((planet: IPlanet) => (
          <h5 key={planet.name} onClick={() => {
              select(planet)
            }}
          >
            {planet.name}
          </h5>
        ))}
      </div>

      <button onClick={next}>
        NEXT
      </button>
      
      {planetsList.map((planet: IPlanet, i: number) => (
        <PlanetCard
          key={i}
          name={planet.name}
          diameter={planet.diameter * 6378.16}
          climate={planet.climate}
          terrain={planet.terrain}
          population={planet.population}
          residents={planet.residents}
          remove={remove}
        />
      ))}

      <button onClick={addNewPlanet}>
        ADD NEW PLANET
      </button>
    </>
  )
}

export default App;