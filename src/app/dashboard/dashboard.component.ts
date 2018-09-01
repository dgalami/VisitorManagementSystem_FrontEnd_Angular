import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { LogVisitor } from '../log.model';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  LineChart=[];
  BarChart=[];

  LoggedInVisitor:LogVisitor[];
  ExpectedVisitor:LogVisitor[];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {

    //line chart
    this.LineChart = new Chart('lineChart',{
      type: 'line',
      data: {
        labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
          label:'Number of Visitors in Months',
          data: [9,7,3,5,2,10,15,16,19,3,1,9],
          fill:false,
          lineTension:0.2,
          borderColor:"red",
          borderWidth: 1,
        }]
      },
      options:{
        title: {
          text:"Line Chart",
          display:true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        }
      }
    });



    //Bar chart
    this.BarChart = new Chart('barChart', {
      type: 'bar',
      data:{
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        datasets: [{
          label: '# of Visitors per day',
          data: [5,6,2,6,8],
          backgroundColor: [
            'rgba(255,99,132,0.2)',
            'rgba(54,162,235,0.2)',
            'rgba(75,192,192,0.2)',
            'rgba(153,102,255,0.2)',
            'rgba(255,159,64,0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54,162,235,1)',
            'rgba(75,192,192,1)',
            'rgba(153,102,255,1)',
            'rgba(255,159,64,1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        title: {
          text: "Bar Chart",
          display: true
        },
        scales:{
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });



    this.getLoggedIn();
    this.getAllExpected();

  }





  //display logged in visitors (current date)
  getLoggedIn(){
    this.dashboardService.getAllLoggedIn()
    .subscribe(data=> {
      this.LoggedInVisitor = data;
    })
  }

  //display expected visitors 
  getAllExpected(){
    this.dashboardService.getAllExpected()
    .subscribe(data=> {
      this.ExpectedVisitor = data;
    })
  }

  //get no of visitors per month (one year)

  //get no of visitor per day (current week)
}
