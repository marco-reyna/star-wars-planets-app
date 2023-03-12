import { IPlanet } from '../types/index';
import usePlanetsStore from '../store/planets';
import { shallow } from 'zustand/shallow'

function PlanetCard(props: IPlanet): JSX.Element {
  const { fetchResidentsNames, clearResidentsList } = usePlanetsStore();
  const { residents } = usePlanetsStore(state => ({
    planets: state.planets,
    residents: state.residents
  }), shallow);

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

  return (
    <div>
      <h1>{props.name}</h1>
      <p>Diameter: <span>{props.diameter}</span> km</p>
      <p>Climate: <span>{props.climate}</span></p>
      <p>Terrain: <span>{props.terrain}</span></p>
      <p>Population: <span>{props.population}</span></p>
      <div onClick={showResidents}>
        Residents:
        {residents.map((resident: string, i: number) => (
          <p key={i}>{resident}</p>
        ))}
      </div>
      <button onClick={() => {
        props.remove(props.name)
      }}>
        DELETE
      </button>
    </div>
  )
}

export default PlanetCard;