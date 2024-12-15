import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IReview } from '../interfaces/ireview.interface';
import { firstValueFrom } from 'rxjs';
import { Rol } from '../interfaces/iuser.interface';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  private apiUrl = 'http://localhost:3000/api/reviews/';
  private http = inject(HttpClient);

  async getAllReviewsByTeacherId(id: string): Promise<IReview[]> {
    return firstValueFrom(this.http.get<any>(this.apiUrl + "teacher/" + id)).then(response => {
      return response;
    });
  }

  async createReview(review: IReview) : Promise<IReview> {
    const headers = new HttpHeaders({
          'Content-Type': 'application/json'
        });
        const options = { headers: headers };
        return firstValueFrom(this.http.post<IReview>(this.apiUrl, review, options));
  }
}
