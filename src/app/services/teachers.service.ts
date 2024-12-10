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

  async getTeacherById(id: string): Promise<ITeacher> {
    return firstValueFrom(this.http.get<any>(this.apiUrl + id)).then(response => {
      return response;
    });
  }

  async getTeachersFiltered(filterOptions: IFilterOptions): Promise<ITeacher[]> {
    return firstValueFrom(this.http.post<any>(this.apiUrl + 'filter', filterOptions)).then(response => {
      return response;
    });
  }

  async getTeacherByUserId(userId: string): Promise<ITeacher> {
    return firstValueFrom(this.http.get<any>(this.apiUrl + 'user/' + userId)).then(response => {
      return response;
    });
  }

  async createTeacher(desciption: string, schedule: string, price: number,experience:string,lat:string,long:string, idUser: number){
    const teacher={
      desciption:desciption,
      schedule:schedule,
      price_p_hour:price,
      experience:experience,
      latitude:lat,
      longitude:long,
      userId:idUser
    }
    return firstValueFrom(this.http.post<any>(this.apiUrl,teacher)).then(response=>{
      return response;
    })
  }
}
