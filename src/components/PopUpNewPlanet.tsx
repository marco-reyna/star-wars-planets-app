import { useState } from 'react';
import { IPlanet } from '../types/index';
import EdiText from 'react-editext';

interface ICreatePlanet {
  createPlanet: (planet: IPlanet) => void;
}

function PopUpNewPlanet(props: ICreatePlanet): JSX.Element {
  const [name, setName] = useState<string>('')
  const [diameter, setDiameter] = useState<number>(0)
  const [climate, setClimate] = useState<string>('')
  const [terrain, setTerrain] = useState<string>('')
  const [population, setPopulation] = useState<number>(0)
  const [residents, setResidents] = useState<string[]>([])
  const [resident, setResident] = useState<string>('')

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
      select: () => {},
    }
    props.createPlanet(planet)
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
    <div className='container-xxl mx-auto text-center pb-5'>
      {!showCreatePlanetPopUp && <button
        className='btn btn-outline-success'
        onClick={addNewPlanet}
      >
        ADD NEW PLANET
      </button>}

      {showCreatePlanetPopUp &&
      <div className='card text-warning border-warning bg-transparent mb-3 p-3' style={{maxWidth: '24rem'}}>
        <h3 className='card-title lh-1'>
          <EdiText showButtonsOnHover type="text" value={name} onSave={setName} />
        </h3>
        <div>
          <div className='d-flex'>
            <span className='fw-bold text-uppercase my-auto mx-2'>Diameter (km): </span> 
            <span className='fw-normal text-lowercase'>
              <EdiText showButtonsOnHover value={diameter.toString()} onSave={setDiameter} />
            </span>
          </div>
          <div className='d-flex'>
            <span className='fw-bold text-uppercase my-auto mx-2'>Climate: </span> 
            <span className='fw-normal text-lowercase'>
              <EdiText showButtonsOnHover value={climate} onSave={setClimate} />
            </span>
          </div>
          <div className='d-flex'> 
            <span className='fw-bold text-uppercase my-auto mx-2'>Terrain: </span> 
            <span className='fw-normal text-lowercase'>
              <EdiText showButtonsOnHover value={terrain} onSave={setTerrain} />
            </span>
          </div>
          <div className='d-flex'>
            <span className='fw-bold text-uppercase my-auto mx-2'>Population: </span> 
            <span className='fw-normal text-lowercase'>
              <EdiText showButtonsOnHover value={population.toString()} onSave={setPopulation} />
            </span>
          </div>
        </div>
        <div
            className='d-flex'
          >
            <span className='fw-bold text-warning text-uppercase my-auto mx-2'>
              Residents:
            </span>
            <span className='fw-normal text-lowercase'>
              <EdiText showButtonsOnHover value={resident} onSave={handleResidents} />
            </span>
          </div>

        <button
          type="button"
          className='btn btn-outline-warning mb-2'
          onClick={create}
        >
          CREATE PLANET
        </button>
      </div>}
    </div>
  )
}

export default PopUpNewPlanet