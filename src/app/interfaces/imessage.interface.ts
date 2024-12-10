import { IUser } from './iuser.interface';

export interface IMessage {
  id?: number;
  text: string;
  date: Date;
  watched: boolean;
  sender: IUser;
  recipient: IUser;
}
