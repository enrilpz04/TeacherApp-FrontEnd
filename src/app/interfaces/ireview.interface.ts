import { IUser } from './iuser.interface';
import { ITeacher } from './iteacher.interface';

export interface IReview {
  id: number;
  rating: number;
  comment?: string;
  date: Date;
  user: IUser;
  teacher: ITeacher;
}
