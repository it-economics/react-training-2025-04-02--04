interface Moon {
  name: string;
}

export interface Planet {
  name: string;
  moons?: Moon[]; // Array<Moon>
  diameter?: number;
  isPopulated: boolean;
  isTaken?: () => boolean
}

export const isTaken = (planet: Planet): boolean => true;

export class MyPlanet implements Planet{
  name = 'Mars'
  isPopulated = false
  isTaken = () => true
}

export type SolarSystem = Planet[];
