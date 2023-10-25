import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { BarElement, CategoryScale, Chart, LinearScale, ScatterController, Title, Tooltip, registerables } from 'chart.js';

Chart.register(Title, Tooltip, CategoryScale, LinearScale, BarElement, ScatterController);

Chart.register(...registerables);




@Component({
  selector: 'app-tablas',
  templateUrl: './tablas.component.html',
  styleUrls: ['./tablas.component.css']
})
export class TablasComponent implements OnInit{
  @ViewChild('myChart') myChart: ElementRef | undefined;
  resolvedData: number = 0;
  pendingData: number = 0;

  constructor(private firestore: Firestore) {}

  ngOnInit() {
    this.loadSolicitudesData();
  }

  async loadSolicitudesData() {
    const querySnapshot = await getDocs(collection(this.firestore, 'titular'));
    this.resolvedData = 0;
    this.pendingData = 0;

    querySnapshot.forEach((doc) => {
      const solicitud = doc.data();
      if (solicitud['estatus'] === 'resuelto') {
        this.resolvedData++;
      } else if (solicitud['estatus'] === 'pendiente') {
        this.pendingData++;
      }
    });

    this.createChart();
  }

  createChart() {
    if (this.myChart) {
      const ctx = this.myChart.nativeElement.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Resuelto', 'Pendiente'],
            datasets: [
              {
                label: 'Solicitudes',
                data: [this.resolvedData, this.pendingData],
                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }
  }
}
