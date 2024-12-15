import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IMessage } from '../interfaces/imessage.interface';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private apiUrl = 'http://localhost:3000/api/messages/';
  private http = inject(HttpClient)


  async getAllMessagesBetweenUsers(user1Id: string, user2Id: string): Promise<IMessage[]> {
    const options = user1Id && user2Id ?
    { params: new HttpParams().set('user1Id', user1Id).set('user2Id', user2Id) } : {};
    return firstValueFrom(this.http.get<any>(this.apiUrl + 'between/', options))
    .then(response => { return response; });
  }

  async getLastMessagesByUser(userId: string): Promise<IMessage[]> {
    const options = userId ? { params: new HttpParams().set('userId', userId) } : {};
    return firstValueFrom(this.http.get<any>(this.apiUrl + 'latests/', options))
    .then(response => { return response; });
  }

  async createMessage(message: IMessage): Promise<IMessage> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
     });
    let options = { headers: headers };
    return firstValueFrom(this.http.post<any>(this.apiUrl, message, options)).then(response => {
      return response;
    });
  }

  async deleteMessage(id: string): Promise<void> {
    return firstValueFrom(this.http.delete<any>(this.apiUrl + id)).then(response => {
      return response;
    });
  }
}
