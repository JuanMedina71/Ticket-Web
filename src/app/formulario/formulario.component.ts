import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {

  forms: FormGroup;

  constructor(private fb: FormBuilder, ) {
    this.forms = this.fb.group({
      titular: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(40), ]],
      curp: ['', [Validators.required,Validators.pattern(/^([A-Z]{4}\d{6}[HM]{1}[A-Z]{5}[0-9A-Z]{2})$/)]],
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      paterno: ['', Validators.required],
      materno: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      celular: ['', [Validators.required, Validators.pattern(/^\+52 \d{10}$/)]],
      correo: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)]],
      nivel: ['', Validators.required],
      municipio: ['', Validators.required],
      asunto: ['', Validators.required],

    })
  }

  enviarFormulario(){
    console.log(this.forms);
  
    if (this.forms.valid) {
      Swal.fire({
        icon: 'success',
        title: 'Registro Exitoso',
        text: 'Sus datos han sido registrados con exito'
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error de validación',
        text: 'Por favor completa correctamente todos los campos'
      })
    }
  }

  

}
