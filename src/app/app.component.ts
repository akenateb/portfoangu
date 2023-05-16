import { Component,OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../assets/css/bootstrap.css','../assets/style.css','../assets/css/dark.css','../assets/css/custom.css','../assets/css/magnific-popup.css','../assets/css/font-icons.css']
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;
  title = 'MiniNews';
  titleHead: any = "Listado de Artículos";
  spanhead: any = "Artículos únicos";

  constructor(private authService: AuthService) {
    window.onload = () => {
      // Load your JavaScript file here
      const script = document.createElement('script');
      script.src = '../assets/js/switch.js';
      document.body.appendChild(script);
    };
  }
  ngOnInit(): void {
    // Comprobar el estado de autenticación al inicializar el componente
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
  }

}
