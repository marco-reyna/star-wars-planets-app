import { useState } from 'react';
import { IPlanet } from '../types/index';
import usePlanetsStore from '../store/planets';
import EdiText from 'react-editext';

function PopUpNewPlanet() {
  const [name, setName] = useState<string>('')
  const [diameter, setDiameter] = useState<number>(0)
  const [climate, setClimate] = useState<string>('')
  const [terrain, setTerrain] = useState<string>('')
  const [population, setPopulation] = useState<number>(0)
  const [residents, setResidents] = useState<string[]>([])
  const [resident, setResident] = useState<string>('')

  const { selectPlanet } = usePlanetsStore();

  const [showCreatePlanetPopUp, setCreatePlanetPopUp] = useState<boolean>(false);

  function create() {
    const planet: IPlanet = {
      name: name,
      diameter: diameter,
      climate: climate,
      terrain: terrain,
      population: population,
      residents: residents,
      remove: () => {},
    }
    selectPlanet(planet)
    setCreatePlanetPopUp(false);
    setName('')
    setDiameter(0)
    setClimate('')
    setTerrain('')
    setPopulation(0)
    setResidents([])
  }

  function handleResidents(name: string) {
    setResident(name)
    setResidents([...residents, resident])
  }

  function addNewPlanet() {
    setCreatePlanetPopUp(true);
  }

  return (
    <>
      <button onClick={addNewPlanet}>
        ADD NEW PLANET
      </button>

      {showCreatePlanetPopUp && 
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
        <div>Residents:
          <span>
            <EdiText showButtonsOnHover value={resident} onSave={handleResidents} />
          </span>
        </div>
        <button onClick={create}>
          CREATE PLANET
        </button>
      </div>}
    </>
  )
}

export default PopUpNewPlanet