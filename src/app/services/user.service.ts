import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  login(email: string, password: string) : Promise<any> {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
