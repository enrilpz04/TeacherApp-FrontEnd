import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { IUser, Rol } from '../interfaces/iuser.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = 'http://localhost:3000/api/auth';
  private http = inject(HttpClient);
  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());
  private userSubject = new BehaviorSubject<IUser | null>(this.getUserFromLocalStorage());

  async login(email: string, password: string): Promise<void> {
    const credentials = { email, password };
    return firstValueFrom(this.http.post<any>(this.apiURL + "/login", credentials)).then(response => {
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.userSubject.next(response.user);
        this.loggedIn.next(true);
      }
    });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.loggedIn.next(false);
  }

  getUser(): Observable<IUser | null> {
    return this.userSubject.asObservable();
  }

  getLoggedInStatus(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  private getUserFromLocalStorage(): IUser | null {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }
}
