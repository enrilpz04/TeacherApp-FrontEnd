import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Icountry } from '../interfaces/icountry.type=interfaces';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  private baseUrl: string= environment.apiUrl;
  private http= inject(HttpClient)
  getAll(region="europe"): Promise<Icountry []>{
    return firstValueFrom(this.http.get<Icountry []>(`${this.baseUrl}region/${region}`))
  }
  constructor() { }
}
