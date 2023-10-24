import { Component, OnInit } from '@angular/core';
import { Firestore, addDoc, collection, getDocs, limit, orderBy, query, where } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  forms: FormGroup;
  municipios: any[] = [];

  constructor(
    private fb: FormBuilder, 
    private firestore: Firestore, 
    private router: Router) {

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

  ngOnInit(): void {
    this.getMunicipios();
  }

  async getMunicipios() {
    const querySnapshot = await getDocs(collection(this.firestore, 'municipio'));
  
    querySnapshot.forEach((doc) => {
      const municipioData = doc.data();
      this.municipios.push(municipioData);
    });
  }
  
  async enviarFormulario(){
    this.addData(this.forms.value);
  }

  async addData (formData : any ) {

    if(this.forms.valid) {
      const municipio = formData.municipio;
      const turno = await this.generateTurno(municipio);


      
      const data = {
        titular: formData.titular,
        curp: formData.curp,
        nombre: formData.nombre,
        paterno: formData.paterno,
        materno: formData.materno,
        telefono: formData.telefono,
        celular: formData.celular,
        correo: formData.correo,
        nivel: formData.nivel,
        asunto: formData.asunto,
        municipio: municipio,
        turno: turno,
      };

      addDoc(collection(this.firestore, 'titular'), data).then(() =>  {
        Swal.fire({
          icon: 'success',
          title: 'Registro con exito',
          text: 'La información se ha guardado correctamente',
        }).then(() => {
          this.router.navigate(['/ticket']);
        });
      })
      .catch((error) =>  {
        Swal.fire({
          icon: 'error',
          title: 'Error al guardar',
          text: 'Hubo un error al guardar los datos en Firestore'
        });
        console.error('Error al guardar en Firestore', error)
      });

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error de validación',
        text: 'Por favor complete correctamente todos los campos',
      });
    }

  }


  verificarTurno() {
    this.router.navigate(['/ticket']);
  }


  async generateTurno(municipio: string): Promise<number> {
    const q = query(
      collection(this.firestore, 'titular'),
      where('municipio', '==', municipio),
      orderBy('turno', 'desc'),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    if(querySnapshot.empty) {
      return 1;
    } else {
      const lastDoc = querySnapshot.docs[0];
      const lastTurno = lastDoc.get('turno');
      return lastTurno + 1;
    }
  }


  

}
