import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IMessage } from '../interfaces/imessage.interface';
import { IUser } from '../interfaces/iuser.interface';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private apiUrl = 'http://localhost:3000/api/messages/';
  private http = inject(HttpClient)


  async getAllMessagesBetweenUsers(userId1: string, userId2: string): Promise<IMessage[]> {
    const options = userId1 && userId2 ?
    { params: new HttpParams().set('userId1', userId1).set('userId2', userId2) } : {};
    return firstValueFrom(this.http.get<any>(this.apiUrl + 'between/', options))
    .then(response => { return response; });
  }

  async getLastMessagesByUser(userId: string): Promise<IMessage[]> {
    const options = userId ? { params: new HttpParams().set('userId', userId) } : {};
    return firstValueFrom(this.http.get<any>(this.apiUrl + 'latests/', options))
    .then(response => { return response; });
  }

  async getChatsByUser(userId: string): Promise<IUser[]> {
    return firstValueFrom(this.http.get<any>(this.apiUrl + 'chats/' + userId))
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

  async getChatsFromUserByName(id: string, name: string): Promise<IUser[]> {
    const options = id && name ? { params: new HttpParams().set('id', id).set('name', name) } : {};
    return firstValueFrom(this.http.get<any>(this.apiUrl + 'chats/text/', options))
    .then(response => { return response; });
  }
}
