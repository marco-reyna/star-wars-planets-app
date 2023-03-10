import { IPlanet } from '../types/index';
import usePlanetsStore from '../store/planets';

function PlanetCard(props: IPlanet): JSX.Element {

  const { fetchResidentsNames } = usePlanetsStore();

  function showResidents():void {
    props.residents.map((url: string) => {
      fetchResidentsNames(url);
    })
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
        {props.residents.map((resident: string, i: number) => (
          <p key={i}>{resident}</p>
        ))}
      </div>
    </div>
  )
}

export default PlanetCard;