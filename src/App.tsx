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

  const [newPlanetsList, setNewPlanetsList] = useState<IPlanet[]>([]);
  
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

  function addPlanet(planet: IPlanet) {
    if (newPlanetsList.includes(planet)) {
      alert("Planet already selected");
    } else {
      setNewPlanetsList([...newPlanetsList, planet]);
    }
  }

  function removePlanet(name: string) {
    setNewPlanetsList(() => {
      return newPlanetsList.filter((planet, index) => {
        return planet.name !== name
      });
    })
  }

  return (
    <>
      <button onClick={prev}>
        PREV
      </button>

      <div style={{display: 'flex', width: '700px', justifyContent: 'space-between'}}>
        {planets.map((planet: IPlanet) => (
          <h5 key={planet.name} onClick={() => {
              addPlanet(planet)
            }}
          >
            {planet.name}
          </h5>
        ))}
      </div>

      <button onClick={next}>
        NEXT
      </button>
      
      {newPlanetsList.map((planet: IPlanet, i: number) => (
        <PlanetCard
          key={i}
          name={planet.name}
          diameter={planet.diameter * 6378.16}
          climate={planet.climate}
          terrain={planet.terrain}
          population={planet.population}
          residents={planet.residents}
          remove={removePlanet}
        />
      ))}
    </>
  )
}

export default App;