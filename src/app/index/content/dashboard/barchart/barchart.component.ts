import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'Chart.js';
import { HttpHeaders, HttpClient } from '@angular/common/http';
declare var $: any;
@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {

  constructor(private http: HttpClient) { }
 
  chartData : any = {};
  ngOnInit() {    
       
    this.loadChartData();
    
  }

  
  loadChartData()
  {
    const headerObj = new HttpHeaders()
      .set('Content-Type', 'application/json');

    this.http.get('http://localhost:8190/laundry/v1/order/status',{ headers: headerObj }).subscribe(
      res => {
        console.log(res);
        this.chartData = res;
        let labels = [];
        let dataArray  = [];

        for (var key in this.chartData) {
            labels.push(key);
            dataArray.push(this.chartData[key]);
        }
        new Chart($("#bar-chart"), {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                        label: 'Order Status',
                        backgroundColor: '#82caeb',
                        borderColor: '#66d8d0',
                        borderWidth: 0,
                        data: dataArray
                    }                 
                ]
            },
            options: {
                maintainAspectRatio: false,
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    xAxes: [{
                        categoryPercentage: 0.6,
                        barPercentage: 0.4,
                    }]
                },
            }
        });

      },
      err => {
          console.log('Log failed');
      }
    );
  }


}
