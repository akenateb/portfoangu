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
  errorMessage = '';

  constructor(private authService: AuthService,private router: Router) {}

  login(): void {
    this.authService.login(this.email, this.password)
      .subscribe(
        response => {
          const token = response.token;
          localStorage.setItem('access_token', token);

          console.log('User logged in successfully');
          this.router.navigate(['/list-users']);
        },
        error => {
          console.error('Login failed', error);
          this.errorMessage = 'Invalid email or password';
        }
      );
  }
}
