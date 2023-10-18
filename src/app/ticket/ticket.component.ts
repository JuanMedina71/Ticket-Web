import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  titulares: any[] = [];

  constructor(private firestore: Firestore) { }

  ngOnInit() {
    this.getTitulares();
  }

  async getTitulares() {
    const querySnapshot = await getDocs(collection(this.firestore, 'titular'));
    querySnapshot.forEach((doc) => {
      this.titulares.push(doc.data());
    });
  }
}
