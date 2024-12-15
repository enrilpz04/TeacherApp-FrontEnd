import { IUser } from './iuser.interface';
import { ITeacher } from './iteacher.interface';

export interface IBooking {
  id?: number;
  date: Date;
  startTime: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'| 'archived';
  student: IUser;
  teacher: ITeacher;
}
