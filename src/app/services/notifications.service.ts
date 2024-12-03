import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { INotification } from '../interfaces/inotification.interface';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private apiURL = 'http://localhost:3000/api/notifications';
  private http = inject(HttpClient);

  async getNotificationsByUserId(userId: string): Promise<INotification[]> {
    return firstValueFrom(this.http.get<INotification[]>(this.apiURL + '/user/' + userId));
  }
}
