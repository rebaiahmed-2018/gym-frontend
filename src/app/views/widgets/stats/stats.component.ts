import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: number[] = [350, 450, 100];
  public doughnutChartType = 'doughnut';
  public chartOptions = {
    title: {
      display: true,
      position: 'top',
      fontFamily: 'Helvetica',
      fontSize: 12,
      fontColor: '#666',
      text: 'Hello'
  },
    responsive: true,
    legend: false,
    maintainAspectRatio: true
  };
  constructor() { }

  ngOnInit() {
  }

}
