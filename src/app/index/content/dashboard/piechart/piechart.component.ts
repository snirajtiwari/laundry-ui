import { Component, OnInit } from '@angular/core';
import { Chart } from 'Chart.js';
declare var $: any;
@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    new Chart($("#pie-chart"), {
      type: 'pie',
      data: {
          labels: ['Open', 'Completed', 'Error'],
          datasets: [{
              label: 'Pie',
              backgroundColor: [
                  'rgba(102, 216, 208, 0.6)',
                  'rgba(118, 178, 229, 0.6)',
                  'rgba(255, 173, 168, 0.6)'
              ],

              borderColor: [
                  '#66d8d0',
                  '#76b2e5',
                  '#ffada8'
              ],
              hoverBorderColor: '#fff',
              data: [5, 10, 8],
              borderWidth: 1
             
          }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        responsiveAnimationDuration:0,
          legend: {
              position: 'bottom',
              labels: {
                  usePointStyle: true,
                  padding: 20
              }
          }
      }
  });

  }

}
