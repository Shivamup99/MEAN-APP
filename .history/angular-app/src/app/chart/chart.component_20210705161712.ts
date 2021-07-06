import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import {Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  lan 
  constructor() { }

  barChartOptions : ChartOptions={responsive:true}
  barChartLabels : Label[] = 
  barChartType : ChartType ='line'
  barChartLegend : true
  barChartPlugins :[]
  barChartColor : Color[]=[
    {
      borderColor:'blue'
    }
  ]

  barChartData : ChartDataSets[]=[{
    data:[99,89,96,78,69,54,90,60,40,30,15,25,85,15],label:'Best Frames'
  }]

  ngOnInit(): void {
  }

}
