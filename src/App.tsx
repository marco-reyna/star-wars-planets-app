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
  const { fetchPlanets, selectPlanet, removePlanet, fetchResidentsNames } = usePlanetsStore();

  const [URL, setURL] = useState<string>('https://swapi.dev/api/planets/?page=1');

  const [selectedPlanetsList, setSelectedPlanetsList] = useState<IPlanet[]>([]);
  const [reload, setReload] = useState<number>(0);
  const [selectedPlanetName, setSelectedPlanetName] = useState<string>('');
  
  useEffect(() => {
    fetchPlanets(URL);
    setSelectedPlanetsList(planetsList);
   }, []);

  function prev(): void {
    setURL(prevPage);
    fetchPlanets(URL);
  }

  function next(): void {
    setURL(nextPage);
    fetchPlanets(URL);
  }

  function select(planet: IPlanet): void {
    if (planetsList.includes(planet)) {
      alert("Planet already selected");
    } else {
      planetsList.push(planet)
      selectPlanet(planetsList)
      setSelectedPlanetsList(planetsList);
    }
  }

  function remove(name: string): void {
    const newList = planetsList.filter(planet => planet.name !== name)
    removePlanet(newList)
    setSelectedPlanetsList(newList);
    setReload(Math.random())
  }

  function showResidents(name: string, planetResidents: string[]): void {
    planetResidents.forEach((urls: string) => {
      fetchResidentsNames(urls);
    })
    setSelectedPlanetName(name)
  }

  return (
    <>
      <div className='container mx-auto text-center pt-5 text-light'>
        <h1 className='text-light' style={{fontFamily: 'Star Wars, sant-serif'}}>Star Wars<br/>Planets App</h1>
        <p className='m-0'>Click on any planet name to display its details.</p>
        <p className='m-0'><strong>Double click</strong> on the '<strong>&lt;</strong>' and '<strong>&gt;</strong>' buttons to see more planets.</p>
      </div>
      <div className='container-md d-flex justify-content-between py-5'>
        {prevPage !== null && 
          <button
            className='btn btn-outline-warning'
            onClick={prev}
          >
            &lt;
          </button>
        }

        <div className='container text-center bg-warning mx-5 rounded-3 py-2'>
          {planets.map((planet: IPlanet, index) => (
            <div className='text-dark fw-bold btn btn-warning' style={{cursor: 'pointer'}} key={index} onClick={() => {
                select(planet)
              }}
            >
              {planet.name}
            </div>
          ))}
        </div>

        {nextPage !== null &&
          <button
          className='btn btn-outline-warning'
          onClick={next}
          >
            &gt;
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
            showResidents={showResidents}
            selectedPlanetName={selectedPlanetName}
          />
        ))}
      </div>
    </>
  )
}

export default App;