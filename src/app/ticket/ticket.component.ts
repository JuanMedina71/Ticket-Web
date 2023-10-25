import { Component, OnInit } from '@angular/core';
import { Firestore, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import * as QRCode from 'qrcode';


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  titulares: any[] = [];
  curpFilter: string = '';

  constructor(private firestore: Firestore, private router: Router) {}

  ngOnInit(): void {
    this.loadTitulares();
  }

  async loadTitulares() {
    
    const q = query(collection(this.firestore, 'titular'), where('curp', '==', this.curpFilter));
    const querySnapshot = await getDocs(q);

    this.titulares = [];

    querySnapshot.forEach((doc) => {
      const titular = doc.data();
      this.titulares.push({ id: doc.id, ...titular, editando: false });
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
    titular.editando = false;
  }

  eliminarTitular(titularId: string) {
    deleteDoc(doc(this.firestore, 'titular', titularId)).then(() => {
      this.titulares = this.titulares.filter((titular) => titular.id !== titularId);
    });
  }

  async generarComprobante(titular: any) {
    const doc = new jsPDF();
  
    doc.setFontSize(20); 
    doc.text("Comprobante de Inscripción", 105, 5, { align: "center" });

    doc.text(`Turno: ${titular.turno}`, 10, 20);
    doc.text(`Titular: ${titular.titular}`, 10, 30);
    doc.text(`CURP: ${titular.curp}`, 10, 40);
    doc.text(`Nombre del alumno: ${titular.nombre}`, 10, 50);
    doc.text(`Apellido Paterno: ${titular.paterno}`, 10, 60);
    doc.text(`Apellido Materno: ${titular.materno}`, 10, 70);
    doc.text(`Celular: ${titular.celular}`, 10, 80);
    doc.text(`Correo: ${titular.correo}`, 10, 90);
    doc.text(`Nivel: ${titular.nivel}`, 10, 100);
    doc.text(`Municipio: ${titular.municipio}`, 10, 110);
    doc.text(`Asunto: ${titular.asunto}`, 10, 120);
    doc.text(`Estatus: ${titular.estatus}`, 10, 130);

    // Generar un código QR
    const qrCodeDataUrl = await QRCode.toDataURL(titular.curp, { errorCorrectionLevel: 'H' });

    const img = new Image();
    img.src = qrCodeDataUrl;
    doc.addImage(img, 'PNG', 140, 10, 50, 50);

    doc.save('comprobante.pdf');
  }
}
