import { useState } from 'react';
import { IPlanet } from '../types/index';
import usePlanetsStore from '../store/planets';
import { shallow } from 'zustand/shallow'
import EdiText from 'react-editext';

function PlanetCard(props: IPlanet): JSX.Element {
  const { fetchResidentsNames, clearResidentsList } = usePlanetsStore();
  const { residents } = usePlanetsStore(state => ({
    planets: state.planets,
    residents: state.residents
  }), shallow);

  const prevName = props.name
  const [name, setName] = useState<string>(props.name)
  const [diameter, setDiameter] = useState<number>(props.diameter)
  const [climate, setClimate] = useState<string>(props.climate)
  const [terrain, setTerrain] = useState<string>(props.terrain)
  const [population, setPopulation] = useState<number>(props.population)
  // const [residents, setResidents] = useState<string[]>([])
  // const [resident, setResident] = useState<string>('')

  const { selectPlanet, removePlanet } = usePlanetsStore();

  function save() {
    const planet: IPlanet = {
      name: name,
      diameter: diameter,
      climate: climate,
      terrain: terrain,
      population: population,
      residents: residents,
      remove: () => {}
    }
    removePlanet(prevName)
    selectPlanet(planet)
  }

  function showResidents() {
    if (residents.length > 0) {
      clearResidentsList()
      props.residents.forEach((urls: string) => {
        fetchResidentsNames(urls);
      })
    } else {
      props.residents.forEach((urls: string) => {
        fetchResidentsNames(urls);
      })
    }
  }


  const handleSave = (value: string) => {
    console.log(value);
  };

  return (
    <div>
      <h1>
        <EdiText showButtonsOnHover type="text" value={name} onSave={setName} />
      </h1>
      <div>Diameter (km):
        <span>
          <EdiText showButtonsOnHover value={diameter.toString()} onSave={setDiameter} />
        </span>
      </div>
      <div>Climate:
        <span>
          <EdiText showButtonsOnHover value={climate} onSave={setClimate} />
        </span>
      </div>
      <div>Terrain: 
        <span>
          <EdiText showButtonsOnHover value={terrain} onSave={setTerrain} />
        </span>
      </div>
      <div>Population:
        <span>
          <EdiText showButtonsOnHover value={population.toString()} onSave={setPopulation} />
        </span>
      </div>
      <div onClick={showResidents}>
        Residents:
      </div>
      <div>
        {residents.map((resident: string, i: number) => (
          <div key={i}>
            <span>
              <EdiText showButtonsOnHover value={resident} onSave={handleSave} />
            </span>
          </div>
        ))}
      </div>
      <button onClick={save}>
        SAVE CHANGES
      </button>
      <button onClick={() => {
        props.remove(name)
      }}>
        DELETE
      </button>
    </div>
  )
}

export default PlanetCard;