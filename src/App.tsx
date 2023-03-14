import { useEffect, useState } from 'react';
import usePlanetsStore from './store/planets';
import PlanetCard from './components/PlanetCard';
import PopUpNewPlanet from './components/PopUpNewPlanet';
import { IPlanet } from './types/index';
import { shallow } from 'zustand/shallow'
import 'bootstrap/dist/css/bootstrap.min.css'

function App(): JSX.Element {
  const { planets, nextPage, prevPage, planetsList } = usePlanetsStore(state => ({
    planets: state.planets,
    nextPage: state.nextPage,
    prevPage: state.prevPage,
    planetsList: state.planetsList
  }), shallow);
  const { fetchPlanets, selectPlanet, removePlanet } = usePlanetsStore();

  const [URL, setURL] = useState<string>('https://swapi.dev/api/planets/?page=1');

  const [selectedPlanetsList, setSelectedPlanetsList] = useState<IPlanet[]>([]);
  const [reload, setReload] = useState<number>(0);
  
  useEffect(() => {
    fetchPlanets(URL);
    setSelectedPlanetsList(planetsList);
   }, []);

  function prev() {
    setURL(prevPage);
    fetchPlanets(URL);
  }

  function next() {
    setURL(nextPage);
    fetchPlanets(URL);
  }

  function select(planet: IPlanet) {
    if (planetsList.includes(planet)) {
      alert("Planet already selected");
    } else {
      planetsList.push(planet)
      selectPlanet(planetsList)
      setSelectedPlanetsList(planetsList);
    }
  }

  function remove(name: string) {
    const newList = planetsList.filter(planet => planet.name !== name)
    removePlanet(newList)
    setSelectedPlanetsList(newList);
    setReload(Math.random())
  }

  return (
    <>
      <div className='container-xxl d-flex justify-content-between py-5'>
        {prevPage !== null && 
          <button
            className='btn btn-outline-warning'
            onClick={prev}
          >
            PREVIOUS
          </button>
        }

        <div className='container d-flex justify-content-around'>
          {planets.map((planet: IPlanet, index) => (
            <button type="button" className='btn btn-light bg-none' key={index} onClick={() => {
                select(planet)
              }}
            >
              {planet.name}
            </button>
          ))}
        </div>

        {nextPage !== null &&
          <button
          className='btn btn-outline-warning'
          onClick={next}
          >
            NEXT
          </button>
        }
      </div>

      <PopUpNewPlanet createPlanet={select} />
      
      <div key={reload} className='d-flex row gap-3 justify-content-center container-xxl mx-auto'>
        {selectedPlanetsList.map((planet: IPlanet, i: number) => (
          <PlanetCard
            key={i}
            name={planet.name}
            diameter={planet.diameter * 6378.16}
            climate={planet.climate}
            terrain={planet.terrain}
            population={planet.population}
            residents={planet.residents}
            remove={remove}
            select={select}
          />
        ))}
      </div>
    </>
  )
}

export default App;