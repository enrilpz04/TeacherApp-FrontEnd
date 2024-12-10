import { IUser } from './iuser.interface';
import { IKnowledge } from './iknowledge.interface';

export interface ITeacher {
  //he puesto que el id no sea necesario a la hora de crear el Teacher ya que en el registro todavia no tenemos el id
  id: string;
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
