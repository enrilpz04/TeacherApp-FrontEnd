import { IUser } from './iuser.interface';
import { ITeacher } from './iteacher.interface';

export interface IBooking {
  id?: string;
  date: Date;
  startTime: string;
  duration: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'archived';
  totalPrice: number;
  student: IUser;
  teacher: ITeacher;
}
