import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';

  constructor(private authService: AuthService) {}

  register(): void {
    this.authService.register(this.name,this.email, this.password)
      .subscribe(
        () => {
          console.log('User registered successfully');
          // Aquí puedes redirigir al usuario a otra página o mostrar un mensaje de éxito
        },
        error => {
          console.error('Registration failed', error);
          // Aquí puedes mostrar un mensaje de error al usuario
        }
      );
  }
}
