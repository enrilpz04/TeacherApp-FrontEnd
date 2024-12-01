import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IReview } from '../interfaces/ireview.interface';
import { firstValueFrom } from 'rxjs';
import { Rol } from '../interfaces/iuser.interface';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  private apiUrl = 'http://localhost:3000/api/reviews/';
  private http = inject(HttpClient)

  async getAllReviewsByTeacherId(id: string) : Promise<IReview[]> {
    /**
     * TODO: Implement this API call
     * return firstValueFrom(this.http.get<any>(this.apiUrl + id)).then(response => {
      return response;
    });
     */
    const reviews: IReview[] = [
      {
        id: 1,
        rating: 5,
        comment: 'Excelente profesor, muy paciente y claro en sus explicaciones.',
        date: new Date('2023-01-15'),
        user: {
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
      },
      {
        id: 2,
        rating: 4,
        comment: 'Muy buen profesor, pero podría mejorar en puntualidad.',
        date: new Date('2023-02-10'),
        user: {
          id: 2,
          name: 'Ana',
          surname: 'López',
          email: 'ana.lopez@example.com',
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
    ];
    return reviews;

  }
}
