import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor() { }

  barChartOptions : ChartOptions={responsive:true}
  barChartLabels : Label[] = ['React','Angular','Node','Python','Ruby','Mongo','Java','Php','Vue','Flutter','Native','Cofee','Express','Happai']
  barChartType : ChartType ='bar'
  barChartLegend : true
  barChartPlugins :[]

  barChartData : ChartDataSets[]=[{
    data:[99,89,96,78,69]
  }]

  ngOnInit(): void {
  }

}
