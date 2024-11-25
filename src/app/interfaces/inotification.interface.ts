import { IUser } from './iuser.interface';

export interface INotification {
  id: number;
  type: string;
  message: string;
  date: Date;
  read: boolean;
  user: IUser;
}
