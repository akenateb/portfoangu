import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://microporfolio.net/midware/'; // Ruta al archivo auth.php en tu servidor
  private jwtHelper: JwtHelperService;

  constructor(private http: HttpClient) {
    this.jwtHelper = new JwtHelperService();
  }

  register(name:string, email: string, password: string): Observable<any> {
    const data = { name, email, password };
    return this.http.post(`${this.apiUrl}auth.php`, JSON.stringify(data));
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}auth.php`, { email, password });
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
  getCurrentUser() {
    // Obtén el usuario actual desde tu lógica de autenticación
    // Por ejemplo, puedes almacenar el usuario en el almacenamiento local (localStorage) o en una variable en memoria
    const currentUser = localStorage.getItem('currentUser');
    console.log(currentUser);
    return currentUser ? JSON.parse(currentUser) : null;
  }
  getCurrentUserId(): number | null {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.userId;
    }
    return null;
  }
}
