import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router) { }

  redirectToRegistro() {
    this.router.navigate(['/register']); // Reemplaza 'ruta-de-registro' con la ruta de tu componente de registro
  }
}
