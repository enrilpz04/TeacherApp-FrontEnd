import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { IUser } from '../interfaces/iuser.interface';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = 'http://localhost:3000/api/auth';
  private http = inject(HttpClient);
  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());
  private userSubject = new BehaviorSubject<IUser | null>(this.getUserFromToken());

  async login(email: string, password: string): Promise<void> {
    const credentials = { email, password };
    return firstValueFrom(this.http.post<any>(this.apiURL + "/login", credentials)).then(response => {
      if (response.token) {
        localStorage.setItem('token', response.token);
        const user = this.decodeToken(response.token);
        this.userSubject.next(user);
        this.loggedIn.next(true);
      }
    });
  }

  async register(formData: FormData): Promise<any> {
    try {
      return await firstValueFrom(this.http.post(this.apiURL + "/register", formData));
    } catch (error: any) {
      if (error.error && error.error.message) {
        throw new Error(error.error.message);
      } else {
        throw new Error('Error al registrar el usuario');
      }
    }
  }

  private decodeToken(token: string): IUser | null {
    try {
      return jwtDecode<IUser>(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.userSubject.next(null);
    this.loggedIn.next(false);
  }

  getUser(): Observable<IUser | null> {
    return this.userSubject.asObservable();
  }

  private getUserFromToken(): IUser | null {
    const token = this.getToken();
    if (token) {
      return this.decodeToken(token);
    }
    return null;
  }

  getLoggedInStatus(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  // Añadir los métodos faltantes
  async changePassword(userId: string, newPassword: string): Promise<void> {
    const url = `${this.apiURL}/change-password`;
    const body = { userId, newPassword };
    await firstValueFrom(this.http.post<void>(url, body));
  }

  async changeAvatar(formData: FormData): Promise<string> {
    const url = `${this.apiURL}/change-avatar`;
    const response = await firstValueFrom(this.http.post<{ uri: string }>(url, formData));
    return response.uri;
  }

  setUserData(user: IUser): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }
}
