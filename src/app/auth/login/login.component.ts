import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService) {}

  login(): void {
    this.authService.login(this.email, this.password)
      .subscribe(
        response => {
          const token = response.token;
          localStorage.setItem('access_token', token);
          console.log('User logged in successfully');
        },
        error => {
          console.error('Login failed', error);
          // Aquí puedes mostrar un mensaje de error al usuario
        }
      );
  }
}
