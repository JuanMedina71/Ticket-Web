import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private afAuth: Auth, private firestore: Firestore) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
       const { email, password, username } = this.registerForm.value;

       this.userService.register({ email, password }).then((userCredential) => {
        // El registro en Firebase Authentication fue exitoso
        // Ahora, guarda el "username" en Firestore
        const uid = userCredential.user.uid; // Obtiene el UID del usuario registrado

        const userData = { email, username, uid };

        // Guarda el "username" en Firestore
        addDoc(collection(this.firestore, 'admins'), userData)
          .then(() => {
            Swal.fire('Exito', 'Registro Exitoso', 'success');
            this.router.navigate(['/login']);
          })
          .catch((error) => {
            Swal.fire('Error', 'Ha ocurrido un error al guardar el "username" en Firestore', 'error');
          });
      }).catch((error) => {
        // Error durante el registro en Firebase Authentication
        if (error.code === 'auth/email-already-in-use') {
          Swal.fire('Error', 'Ya existe una cuenta con este correo electrónico', 'error');
        } else {
          Swal.fire('Error', 'Ha ocurrido un error durante el registro', 'error');
        }
      });
    }
  }
}