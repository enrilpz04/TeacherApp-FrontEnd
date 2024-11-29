import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { IUser } from '../interfaces/iuser.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/api/users';
  private registerApiUrl= 'http://localhost:3000/api/auth/register';
  httpClient = inject(HttpClient);

  login(email: string, password: string) : Promise<any> {
    console.log('Email: ' + email + ' - Contraseña: ' + password);
    return lastValueFrom(this.httpClient.get<string>(`${this.apiUrl}/?email=${email}&password=${password}`));
  }

  async getAllUser(){
    return firstValueFrom(this.httpClient.get<any>(this.apiUrl)).then(response => {return response})
  }

 async register(newUser:IUser): Promise<any>{

    return firstValueFrom( this.httpClient.post(this.registerApiUrl,newUser)).then(response => {return response});
  }

  constructor() { }
}
