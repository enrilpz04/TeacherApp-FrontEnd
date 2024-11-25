import { IUser } from './iuser.interface';
import { IKnowledge } from './iknowledge.interface';

export interface ITeacher {
  id: number;
  description: string;
  schedule: 'Morning' | 'Afternoon' | 'Night';
  price_p_hour: number;
  experience: string;
  rating: number;
  validated: boolean;
  latitude: string;
  longitude: string;
  user: IUser;
  knowledges: IKnowledge[];
}
