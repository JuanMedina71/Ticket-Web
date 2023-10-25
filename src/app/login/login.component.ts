import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService, 
    private router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    // Cualquier inicialización adicional que puedas necesitar
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.userService.login({ email, password }).then(() => {
        // Inicio de sesión exitoso
        Swal.fire('Éxito', 'Inicio de sesión exitoso', 'success');
        this.router.navigate(['/admins']);
        // Puedes redirigir al usuario a otra página aquí si es necesario
      }).catch((error) => {
        // Error durante el inicio de sesión
        if (error.code === 'auth/user-not-found') {
          Swal.fire('Error', 'No se encontró una cuenta con este correo electrónico', 'error');
        } else if (error.code === 'auth/wrong-password') {
          Swal.fire('Error', 'Contraseña incorrecta', 'error');
        } else {
          Swal.fire('Error', 'Ha ocurrido un error durante el inicio de sesión', 'error');
        }
      });
    }
  }
}
