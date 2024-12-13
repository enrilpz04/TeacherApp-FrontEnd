export interface IUser {
  id?: string;
  name: string;
  surname: string;
  email: string;
  validated?: boolean;
  password: string;
  avatar?: string;
  rol?: Rol;
}


export enum Rol {
  ADMIN = 'admin',
  STUDENT = 'student',
  TEACHER = 'teacher'
}
