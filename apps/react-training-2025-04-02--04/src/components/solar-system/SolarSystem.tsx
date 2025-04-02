import { MyPlanet, SolarSystem as SolarSystemModel } from './model';
import { Planet } from './Planet';

export const SolarSystem = () => {
  return (
    <>
      <h1>Our Solar System</h1>
      <ol>
        {solarSystem.map((planet) => (
          <Planet key={planet.name} {...planet} />
        ))}
      </ol>
    </>
  );
};

const mars = new MyPlanet()

const solarSystem: SolarSystemModel = [
  { name: 'Mercury', isPopulated: false },
  { name: 'Venus', isPopulated: false },
  {
    name: 'Earth',
    isPopulated: true,
    moons: [{ name: 'Moon' }],
    diameter: 16000,
  },
  mars,
];
