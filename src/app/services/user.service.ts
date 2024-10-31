import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  login(email: string, password: string) : Promise<any> {
    console.log('Email: ' + email + ' - Contraseña: ' + password);
    return new Promise(() => "");
  }

  constructor() { }
}
