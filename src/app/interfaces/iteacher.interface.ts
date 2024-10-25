import { IKnowledge } from "./iknowledge.interface";

export interface ITeacher {
  id: number;
  user_id: number;
  description: string;
  price_p_hour: number;
  experience: string;
  rating: number;
  validated: boolean;
  latitude: string;
  longitude: string;
  knowledges: IKnowledge[];
}
