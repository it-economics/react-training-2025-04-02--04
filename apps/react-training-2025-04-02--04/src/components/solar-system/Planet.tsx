import { FC } from 'react';
import { Planet as PlanetModel } from './model';

// type PlanetProps = Omit<PlanetModel, 'isPopulated'>;
// type X = Pick<PlanetModel, 'name' | 'moons'>

export const Planet: FC<PlanetModel> = ({
  name,
  diameter,
  moons,
  isPopulated,
  isTaken
}) => {
  return (
    <>
      <h2>{name}</h2>
      <h3>Meta-Information:</h3>
      <ul>
        <li>Diameter: {diameter ? diameter : 'unknown'}</li>
        <li>Is populated: {isPopulated ? 'yes' : 'no'}</li>
        {moons && (
          <li>
            Moons: {moons ? moons.map(({ name }) => name).join(', ') : 'none'}
          </li>
        )}
      </ul>
    </>
  );
};
