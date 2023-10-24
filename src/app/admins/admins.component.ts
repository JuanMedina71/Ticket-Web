import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs, query } from '@angular/fire/firestore';
import { deleteDoc, where } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {
  admins$: Observable<any[]> =new Observable<any[]>(); // Usamos un observable para manejar los datos

  constructor(private firestore: Firestore) {}

  async ngOnInit() {
    const adminsCollection = collection(this.firestore, 'admins');
    const adminsQuery = query(adminsCollection);

    const snapshot = await getDocs(adminsQuery);
    this.admins$ = new Observable((observer) => {
      observer.next(snapshot.docs.map((doc) => doc.data()));
      observer.complete();
    });
  }

  async eliminarAdmin(uid: string) {
    try {
      if (!uid) {
        console.error('UID del administrador no válido.');
        return;
      }
  
      const adminsCollection = collection(this.firestore, 'admins');
      const adminQuery = query(adminsCollection, where('uid', '==', uid)); // Asegúrate de que el campo sea 'uid'
  
      const adminDocs = await getDocs(adminQuery);
      if (adminDocs.size === 0) {
        console.error('No se encontró el administrador con el UID proporcionado.');
        return;
      }
  
      // Suponiendo que solo debería haber un administrador con el mismo UID
      const adminDoc = adminDocs.docs[0];
  
      await deleteDoc(adminDoc.ref);
      console.log('Administrador eliminado exitosamente.');
    } catch (error) {
      console.error('Error al eliminar administrador:', error);
    }
  }
  
}
