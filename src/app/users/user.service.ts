import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = 'http://localhost:3000/users'; // Asume que tu API está corriendo en localhost:8080

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}`);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseURL}/${id}`);
  }

  createUser(user: User): Observable<Object> {
    return this.http.post(`${this.baseURL}`, user);
  }

  updateUser(id: number | undefined, user: User): Observable<Object> {
    return this.http.put(`${this.baseURL}/${id}`, user);
  }

  deleteUser(id: number): Observable<Object> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
