import { IUser } from './iuser.interface';
import { ITeacher } from './iteacher.interface';

export interface IBooking {
  id: number;
  date: Date;
  startTime: string;
  duration: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  totalPrice: number;
  student: IUser;
  teacher: ITeacher;
}
