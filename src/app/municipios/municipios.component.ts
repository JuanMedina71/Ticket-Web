import { Component, OnInit } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-municipios',
  templateUrl: './municipios.component.html',
  styleUrls: ['./municipios.component.css']
})
export class MunicipiosComponent implements OnInit {
  municipios: any[] = [];
  nuevoMunicipio: string = '';
  municipioEditado: string = '';
  municipioEditadoId: string = '';
  editingIndex: number = -1;

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    this.getMunicipios();
  }

  async getMunicipios() {
    const querySnapshot = await getDocs(collection(this.firestore, 'municipio'));
    this.municipios = [];
    querySnapshot.forEach((doc) => {
      this.municipios.push({ id: doc.id, nombre: doc.data()['nombre'] });
    });
  }

  async agregarMunicipio() {
    if (this.nuevoMunicipio) {
      const nuevoMunicipioDoc = await addDoc(collection(this.firestore, 'municipio'), {
        nombre: this.nuevoMunicipio
      });
      this.nuevoMunicipio = '';
      this.getMunicipios();
    }
  }

  async editarMunicipio(index: number) {
    const municipio = this.municipios[index];
    this.municipioEditado = municipio.nombre;
    this.municipioEditadoId = municipio.id;
    this.editingIndex = index;
  }

  async guardarMunicipioEditado() {
    if (this.municipioEditado && this.municipioEditadoId) {
      const municipioDocRef = doc(this.firestore, 'municipio', this.municipioEditadoId);
      await updateDoc(municipioDocRef, { nombre: this.municipioEditado });
      this.municipioEditado = '';
      this.municipioEditadoId = '';
      this.editingIndex = -1;
      this.getMunicipios();
    }
  }

  async eliminarMunicipio(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este municipio?')) {
      const municipioDocRef = doc(this.firestore, 'municipio', id);
      await deleteDoc(municipioDocRef);
      this.getMunicipios();
    }
  }
}
