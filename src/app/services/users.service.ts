import { Injectable } from '@angular/core';
import { IUser, Rol } from '../interfaces/iuser.interface';
import { USER } from '../../database/user.db';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users : IUser[] = USER

  constructor() { }

  getTeachersByName(name: string) : IUser[] {
    if (name === '') {
      return this.users.filter(user => user.rol === Rol.TEACHER);
    }
    return this.users.filter(user => user.rol === Rol.TEACHER && user.name.startsWith(name));
  }

}
