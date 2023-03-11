import { IPlanet } from '../types/index';
import usePlanetsStore from '../store/planets';

function PlanetCard(props: IPlanet): JSX.Element {
  const { fetchResidentsNames, clearResidentsList } = usePlanetsStore();
  const { residents } = usePlanetsStore(state => ({residents: state.residents}))

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
      <p>Diameter: {props.diameter} km</p>
      <p>Climate: {props.climate}</p>
      <p>Terrain: {props.terrain}</p>
      <p>Population: {props.population}</p>
      <div onClick={showResidents}>
        Residents:
        {residents.map((resident: string, i: number) => (
          <p key={i}>{resident}</p>
        ))}
      </div>
    </div>
  )
}

export default PlanetCard;