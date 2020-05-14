import { Component, OnInit } from '@angular/core';
import { Chart } from 'Chart.js';
declare var $: any;
@Component({
  selector: 'app-radarchart',
  templateUrl: './radarchart.component.html',
  styleUrls: ['./radarchart.component.css']
})
export class RadarchartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    new Chart($("#radar-chart"), {
      type: 'radar',
      data: {
          labels: ['3h', '6h', '9h', '12h', '15h', '18h', '21h', '24h'],
          datasets: [{
                  label: 'Completed',
                  backgroundColor: 'rgba(102, 216, 208, 0.6)',
                  borderColor: '#66d8d0',
                  borderWidth: 1,
                  data: [13, 15, 18, 32, 9, 23, 25, 17, ]


              },
              {
                  label: 'Open',
                  backgroundColor: 'rgba(118, 178, 229, 0.6)',
                  borderColor: '#76b2e5',
                  borderWidth: 1,
                  data: [15, 15, 28, 12, 22, 20, 31, 24]

              },
              {
                  label: 'Error',
                  backgroundColor: 'rgba(255, 173, 168, 0.6)',
                  borderColor: '#ffada8',
                  borderWidth: 1,
                  data: [21, 23, 14, 12, 17, 13, 18, 12]

              }
          ]
    
    
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        responsiveAnimationDuration:0,
          legend: {
              display: true,
              position: 'bottom',
              labels: {
                  usePointStyle: true,
                  padding: 4
              }
              
          }
         
      }
  });
  }

}
