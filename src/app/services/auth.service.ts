import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/auth'; // Reemplaza con la URL de tu servidor backend

  constructor(private http: HttpClient) {}

  register(name:string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { name, email, password });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  logout(): void {
    // Eliminar el token de acceso del almacenamiento local
    localStorage.removeItem('access_token');
  }
  isLoggedIn(): boolean {
    // Verificar si el token de acceso existe en el almacenamiento local
    const token = localStorage.getItem('access_token');
    return !!token; // Devuelve true si el token existe, false si es nulo o indefinido
  }
}
