import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ITeacher } from '../interfaces/iteacher.interface';
import { IFilterOptions } from '../interfaces/ifilter-options';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  private apiUrl = 'http://localhost:3000/api/teachers/';
  private http = inject(HttpClient)

  async getAll(): Promise<ITeacher[]> {
    return firstValueFrom(this.http.get<any>(this.apiUrl)).then(response => {
      return response;
    });
  }

  async getTeachersFiltered(filterOptions: IFilterOptions): Promise<ITeacher[]> {
    return firstValueFrom(this.http.post<any>(this.apiUrl + 'filter', filterOptions)).then(response => {
      return response;
    });
  }
}
