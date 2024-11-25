import { IUser } from './iuser.interface';

export interface IMessage {
  id: number;
  text: string;
  date: Date;
  sender: IUser;
  recipient: IUser;
}
