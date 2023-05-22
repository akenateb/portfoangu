import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.authService.register(this.name,this.email, this.password)
      .subscribe(
        (message) => {
          console.log('User registered successfully', message);
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Registration failed', error);
          // Aquí puedes mostrar un mensaje de error al usuario
        }
      );
  }
}
