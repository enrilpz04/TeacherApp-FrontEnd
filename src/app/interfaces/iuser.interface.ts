export interface IUser {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  rol: Rol
}


export enum Rol {
  ADMIN = 'admin',
  STUDENT = 'student',
  TEACHER = 'teacher'
}
