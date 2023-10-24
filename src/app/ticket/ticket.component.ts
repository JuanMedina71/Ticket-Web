import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';




@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],

})
export class TicketComponent implements OnInit {
  titulares: any[] = [];
  curp: string = '';

  constructor(private firestore: Firestore) { }

  ngOnInit() {
    // Puedes llamar a esta función cuando se inicie el componente o cuando el usuario realice una búsqueda.
    // this.getTitulares();
  }

  async searchByCurp() {
    // Si la CURP está vacía, no hagas la consulta.
    if (!this.curp) {
      this.titulares = [];
      return;
    }

    const q = query(collection(this.firestore, 'titular'), where('curp', '==', this.curp));
    const querySnapshot = await getDocs(q);

    this.titulares = querySnapshot.docs.map((doc) => doc.data());
  }
}
