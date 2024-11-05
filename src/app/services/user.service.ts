import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/api/user';
  httpClient = inject(HttpClient);

  login(email: string, password: string) : Promise<any> {
    console.log('Email: ' + email + ' - Contraseña: ' + password);
    return lastValueFrom(this.httpClient.get<string>(`${this.apiUrl}/?email=${email}&password=${password}`));
  }

  constructor() { }
}
