import { Injectable } from '@angular/core';
import { IBooking } from '../interfaces/ibooking.interface';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Rol } from '../interfaces/iuser.interface';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  async getBookingsByDateAndTeacherId(date: Date, teacherId: number): Promise<IBooking[]> {
    const bookings: IBooking[] = [
      {
        id: 1,
        date: new Date('2024-12-01'),
        startTime: '08:00',
        duration: 1,
        status: 'confirmed',
        totalPrice: 20,
        student: {
          id: 1,
          name: 'Juan',
          surname: 'Pérez',
          email: 'juan.perez@example.com',
          password: 'password',
          rol: Rol.STUDENT
        },
        teacher: {
          id: 1,
          description: 'Profesor de matemáticas con 10 años de experiencia.',
          schedule: 'Morning',
          price_p_hour: 20,
          experience: '10 años enseñando matemáticas en diferentes niveles.',
          rating: 4.8,
          validated: true,
          latitude: '40.4165',
          longitude: '-3.70256',
          user: {
            id: 1,
            name: 'Carlos',
            surname: 'García',
            email: 'carlos.garcia@example.com',
            password: 'password',
            rol: Rol.TEACHER
          },
          knowledges: [
            { id: 1, name: 'Matemáticas' },
            { id: 2,  name: 'Física' }
          ]
        }
      }
    ]
    return bookings;
  }
}
