import { Component, OnInit } from '@angular/core';
import { Chart } from 'Chart.js';
declare var $: any;
@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function() {
    new Chart($("#area-chart"), {
      type: 'line',
      data: {
          labels: ["Jan", "Feb",  "Mar",   "Apr",   "May",  "June", "July", "Aug", "Sep",  "Oct",   "Nov",  "Dec"],
          datasets: [

              {
                  label: 'Completed',
                  data: [15, 39, 15, 41, 56, 25, 10, 35, 30, 10, 20, 5],
                  backgroundColor: 'rgba(102, 216, 208, 0.6)',
                  borderColor: '#66d8d0',
                  borderWidth: 1,
                  pointRadius: 3,
              }, {
                  label: 'Open',
                  data: [5, 9, 10, 81, 26, 35, 40, 35, 10, 60, 10, 15],
                  backgroundColor: "rgba(118, 178, 229, 0.6)",
                  borderColor: '#76b2e5',
                  borderWidth: 1,
                  pointRadius: 3,
              }, {
                  label: 'Error',
                  data: [25, 19, 20, 31, 66, 95, 0, 15, 60, 10, 30, 5],
                  backgroundColor: "rgba(255, 173, 168, 0.6)",
                  borderColor: '#ffada8',
                  borderWidth: 1,
                  pointRadius: 3,
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
                  padding: 20,
        boxWidth: 30,
              }
          },
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          },
      }
  });
    });
  
  }

}
