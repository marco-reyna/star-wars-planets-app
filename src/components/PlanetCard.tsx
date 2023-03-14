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
  const [showSaveBtn, setSaveBtn] = useState<boolean>(false);

  function save() {
    const planet: IPlanet = {
      name: name,
      diameter: diameter,
      climate: climate,
      terrain: terrain,
      population: population,
      residents: residents,
      remove: () => {},
      select: () => {}
    }
    props.remove(prevName)
    props.select(planet)
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
        <div
          className='fw-bold btn text-warning text-uppercase'
          onClick={showResidents}
        >
          Residents:
        </div>
        <div className='px-3 mb-2'>
          {residents.map((resident: string, i: number) => (
            <div key={i} className='fw-normal'>
              <EdiText showButtonsOnHover value={resident} onSave={handleSave} />
            </div>
          ))}
        </div>
      </div>
      {showSaveBtn && <button
        type="button"
        className='btn btn-outline-warning mb-2'
        onClick={save}
      >
        SAVE CHANGES
      </button>}
      <button
        type='button'
        className='btn btn-outline-warning'
        onClick={() => {
          props.remove(name)
        }}
      >
        DELETE
      </button>
    </div>
  )
}

export default PlanetCard;