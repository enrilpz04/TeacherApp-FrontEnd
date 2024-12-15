import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IReview } from '../interfaces/ireview.interface';
import { firstValueFrom } from 'rxjs';
import { Rol } from '../interfaces/iuser.interface';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  private apiUrl = 'http://localhost:3000/api/reviews/teacher/';
  private http = inject(HttpClient);

  async getAllReviewsByTeacherId(id: string): Promise<IReview[]> {

    return firstValueFrom(this.http.get<any>(this.apiUrl + id)).then(response => {
      return response;
    });

  }
}
