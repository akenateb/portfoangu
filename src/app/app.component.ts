import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../assets/css/bootstrap.css','../assets/style.css','../assets/css/dark.css','../assets/css/custom.css','../assets/css/magnific-popup.css','../assets/css/font-icons.css']
})
export class AppComponent {
  title = 'MiniNews';
  titleHead: any = "Listado de Artículos";
  spanhead: any = "Artículos únicos";

  constructor() {
    window.onload = () => {
      // Load your JavaScript file here
      const script = document.createElement('script');
      script.src = '../assets/js/switch.js';
      document.body.appendChild(script);
    };
  }

}
