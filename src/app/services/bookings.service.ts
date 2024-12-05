import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IBooking } from '../interfaces/ibooking.interface';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  private apiUrl = 'http://localhost:3000/api/bookings/';
  private http = inject(HttpClient)

  async getBookingById(id: string): Promise<IBooking> {
    return firstValueFrom(this.http.get<any>(this.apiUrl + id)).then(response => {
      return response;
    });
  }

  async getAllBookingsFromStudent(studentId: string): Promise<IBooking[]> {
    return firstValueFrom(this.http.get<any>(this.apiUrl + 'student/' + studentId))
      .then(response => { return response; });
  }

  async getAllBookingsFromTeacher(teacherId: string): Promise<IBooking[]> {
    return firstValueFrom(this.http.get<any>(this.apiUrl + 'teacher/' + teacherId))
      .then(response => { return response; });
  }

  async getBookingsByDateAndTeacherId(date: Date, teacherId: string): Promise<IBooking[]> {
    console.log(date, teacherId);
    const options = date && teacherId ?
      { params: new HttpParams().set('date', date.toString()).set('teacherId', teacherId) } : {};
    return firstValueFrom(this.http.get<any>(this.apiUrl + 'date/', options)).then(response => {
      return response;
    })
  }

  async getAllBookingsBetweenStudentAndTeacher(studentId: string, teacherId: string): Promise<IBooking[]> {
    const options = studentId && teacherId ?
      { params: new HttpParams().set('studentId', studentId).set('teacherId', teacherId) } : {};
    return firstValueFrom(this.http.get<any>(this.apiUrl + 'between', options)).then(response => {
      return response;
    });
  }

  async createBooking(booking: IBooking): Promise<IBooking> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };
    return firstValueFrom(this.http.post<any>(this.apiUrl, booking, options)).then(response => {
      return response;
    });
  }

  async updateBooking(booking: IBooking): Promise<IBooking> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };
    return firstValueFrom(this.http.put<any>(this.apiUrl + booking.id, booking, options)).then(response => {
      return response;
    });
  }

  async deleteBooking(id: string): Promise<IBooking> {
    return firstValueFrom(this.http.delete<any>(this.apiUrl + id)).then(response => {
      return response;
    });
  }
}
