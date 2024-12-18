import { IUser } from './iuser.interface';

export interface INotification {
  id?: number;
  type: Tipo;
  message: string;
  date: Date;
  formatDate?: string;
  watched: boolean;
  user: IUser;
}

export enum Tipo {
  new_teacher_registration = 'new_teacher_registration',
  teacher_validation = 'teacher_validation',
  booking_created = 'booking_created',
  booking_confirmed = 'booking_confirmed',
  booking_cancelled = 'booking_cancelled',
  new_message = 'new_message',
  new_review = 'new_review',
  profile_updated = 'profile_updated',
  booking_status_change = 'booking_status_change',
  upcoming_class = 'upcoming_class'
}
