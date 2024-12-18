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

  /**
   * Obtiene todas las reservas de un estudiante.
   * @param {string} studentId - ID del estudiante.
   * @returns {Promise<IBooking[]>} - Lista de reservas del estudiante.
   */
  async getAllBookingsFromStudent(studentId: string): Promise<IBooking[]> {
    return firstValueFrom(this.http.get<IBooking[]>(`${this.apiUrl}student/${studentId}`));
  }

  /**
   * Obtiene todas las reservas de un profesor.
   * @param {string} teacherId - ID del profesor.
   * @returns {Promise<IBooking[]>} - Lista de reservas del profesor.
   */
  async getAllBookingsFromTeacher(teacherId: string): Promise<IBooking[]> {
    return firstValueFrom(this.http.get<IBooking[]>(`${this.apiUrl}teacher/${teacherId}`));
  }

  /**
   * Obtiene todas las reservas de un profesor en una fecha específica.
   * @param {Date} date - Fecha de las reservas.
   * @param {string} teacherId - ID del profesor.
   * @returns {Promise<IBooking[]>} - Lista de reservas del profesor en la fecha especificada.
   */
  async getAllBookingsFromTeacherByDate(date: Date, teacherId: string): Promise<IBooking[]> {
    console.log(date)
    const params = new HttpParams().set('teacherId', teacherId).set('date', date.toString());
    return firstValueFrom(this.http.get<IBooking[]>(this.apiUrl + 'teacher/date', { params })).then(response => {
      return response;
    });
  }

  /**
   * Obtiene todas las reservas de un user por fecha y estado.
   * @param {string} userId - ID del user.
   * @param {Date} date - Fecha de las reservas.
   * @param {string} status - Estado de las reservas.
   * @returns {Promise<IBooking[]>} - Lista de reservas del profesor por fecha y estado.
   */
  async getAllBookingsFromUserByDateAndStatus(userId: string, date: Date, status: string | null): Promise<IBooking[]> {
    let params = new HttpParams().set('userId', userId);

    if (date) {
      params = params.set('date', date.toString());
    }

    if (status) {
      params = params.set('status', status);
    }

    return firstValueFrom(this.http.get<any>(this.apiUrl + 'date-status', { params })).then(response => {
      return response;
    });
  }

  /**
   * Obtiene todas las reservas entre un estudiante y un profesor.
   * @param {string} studentId - ID del estudiante.
   * @param {string} teacherId - ID del profesor.
   * @returns {Promise<IBooking[]>} - Lista de reservas entre el estudiante y el profesor.
   */
  async getAllBookingsBetweenStudentAndTeacher(studentId: string, teacherId: string): Promise<IBooking[]> {
    const params = new HttpParams().set('studentId', studentId).set('teacherId', teacherId);
    return firstValueFrom(this.http.get<IBooking[]>(`${this.apiUrl}between`, { params }));
  }

  /**
   * Obtiene una reserva por su ID.
   * @param {string} id - ID de la reserva.
   * @returns {Promise<IBooking>} - La reserva con el ID especificado.
   */
  async getBookingById(id: string): Promise<IBooking> {
    return firstValueFrom(this.http.get<IBooking>(`${this.apiUrl}${id}`));
  }

  /**
   * Crea una nueva reserva.
   * @param {IBooking} booking - Objeto de la reserva a crear.
   * @returns {Promise<IBooking>} - La reserva creada.
   */
  async createBooking(booking: IBooking): Promise<IBooking> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };
    return firstValueFrom(this.http.post<IBooking>(this.apiUrl, booking, options));
  }

  /**
   * Actualiza una reserva existente.
   * @param {string} id - ID de la reserva a actualizar.
   * @param {IBooking} booking - Objeto de la reserva con los datos actualizados.
   * @returns {Promise<IBooking>} - La reserva actualizada.
   */
  async updateBooking(id: string, booking: IBooking): Promise<IBooking> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };
    return firstValueFrom(this.http.put<IBooking>(`${this.apiUrl}${id}`, booking, options));
  }

  /**
   * Elimina una reserva.
   * @param {string} id - ID de la reserva a eliminar.
   * @returns {Promise<void>} - Promesa que se resuelve cuando la reserva es eliminada.
   */
  async deleteBooking(id: string): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${this.apiUrl}${id}`));
  }
}
