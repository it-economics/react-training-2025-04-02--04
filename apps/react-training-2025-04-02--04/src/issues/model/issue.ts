import { v4 as uuidv4 } from 'uuid';

export enum IssuePriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export type Issue = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: IssuePriority;
  createdAt: number;
};

export const issueFactory = () => ({
  id: uuidv4(),
  title: 'new',
  description: '<EMPTY>',
  completed: false,
  priority: 'LOW',
  createdAt: Date.now(),
});
