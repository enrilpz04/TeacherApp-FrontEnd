import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/api/user';
  httpClient = inject(HttpClient);

  login(email: string, password: string) : Promise<any> {
    console.log('Email: ' + email + ' - Contraseña: ' + password);
    let body = '{"email":"' + email + '", "password":"' + password + '"}';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
     });
    let options = { headers: headers };
    return lastValueFrom(this.httpClient.post<string>(this.apiUrl + "/login", body, options));
  }

  search(filtro1: string, filtro2: string) : Promise<any> {
    console.log('filtro1: ' + filtro1 + ' - filtro2: ' + filtro2);
    return lastValueFrom(this.httpClient.get<string>(`${this.apiUrl}/search?filtro1=${filtro1}&filtro2=${filtro2}`));
  }

  constructor() { }
}
