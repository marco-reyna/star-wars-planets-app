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
        <EdiText showButtonsOnHover type="text" value={props.name} onSave={handleSave} />
      </h1>
      <p>Diameter (km):
        <span>
          <EdiText showButtonsOnHover value={props.diameter.toString()} onSave={handleSave} />
        </span>
      </p>
      <p>Climate:
        <span>
          <EdiText showButtonsOnHover value={props.climate} onSave={handleSave} />
        </span>
      </p>
      <p>Terrain: 
        <span>
          <EdiText showButtonsOnHover value={props.terrain} onSave={handleSave} />
        </span>
      </p>
      <p>Population:
        <span>
          <EdiText showButtonsOnHover value={props.population.toString()} onSave={handleSave} />
        </span>
      </p>
      <div onClick={showResidents}>
        Residents:
      </div>
      <div>
        {residents.map((resident: string, i: number) => (
          <p key={i}>
            <span>
              <EdiText showButtonsOnHover value={resident} onSave={handleSave} />
            </span>
          </p>
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