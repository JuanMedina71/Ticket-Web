import { Component, OnInit } from '@angular/core';
import { Firestore, collection, deleteDoc, doc, getDocs, updateDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {
  titularData: any[] = [];

  constructor(private firestore: Firestore, private router: Router) { }

  ngOnInit(): void {
    this.getTitularData();
  }

  async getTitularData() {
    const querySnapshot = await getDocs(collection(this.firestore, 'titular'));
    querySnapshot.forEach((doc) => {
      this.titularData.push({ id: doc.id, ...doc.data(), editando: false });
    });
  }

  editarTitular(titular: any) {
    titular.editando = true;
  }

  async guardarCambios(titular: any) {
    try {
      const docRef = doc(this.firestore, 'titular', titular.id);
      await updateDoc(docRef, {
        estatus: titular.estatus,
        curp: titular.curp,
        nivel: titular.nivel,
        municipio: titular.municipio,
        asunto: titular.asunto,
        titular: titular.titular
      });
      titular.editando = false; // Desactiva la edición después de guardar
    } catch (error) {
      console.error('Error al guardar cambios: ', error);
    }
  }

  cancelarEdicion(titular: any) {
    // Vuelve a cargar los datos originales o cancela la edición
    titular.editando = false;
  }

  eliminarTitular(titularId: string) {
    deleteDoc(doc(this.firestore, 'titular', titularId)).then(() => {
      this.titularData = this.titularData.filter((titular) => titular.id !== titularId);
    });
  }
}
