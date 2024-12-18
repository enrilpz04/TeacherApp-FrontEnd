import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  async getTeachersWithPagination(page: number, size: number) : Promise<any> {
    const url = `${this.apiUrl}pagination?page=${page}&size=${size}`;
    return firstValueFrom(this.http.get<any>(url)).then(response => {
      return response;
    })
  }

  async updateTeacher(teacher : ITeacher) : Promise<ITeacher> {
    return firstValueFrom(this.http.put<any>(this.apiUrl + teacher.id, teacher)).then(response => {
      return response;
    })
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

  async createTeacher(formData: FormData) : Promise<ITeacher> {
    return firstValueFrom(this.http.post<ITeacher>(this.apiUrl, formData))
  }
}
