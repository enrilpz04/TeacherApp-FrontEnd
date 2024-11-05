import { IKnowledge } from "./iknowledge.interface";
import { IUser } from "./iuser.interface";

export interface ITeacher {
  id: number;
  user: IUser;
  description: string;
  price_p_hour: number;
  schedule: string;
  experience: string;
  rating: number;
  validated: boolean;
  latitude: string;
  longitude: string;
  knowledges: IKnowledge[];
}
