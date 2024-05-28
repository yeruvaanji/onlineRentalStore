import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl: any;
  constructor(private http: HttpClient) {}
  register(user: any): Observable<any> {
    console.log('user', user);
    return this.http.post(environment.apiUrl + '/register', user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<{ token: string }>(environment.apiUrl + '/login', credentials);
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl + '/usersList');
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
