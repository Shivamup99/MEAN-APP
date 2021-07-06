import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import {Color, Label } from 'ng2-charts';
import * as data from './chart.json';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  // lan =['React','Angular','Node','Python','Ruby','Mongo','Java','Php','Vue','Flutter','Native','Cofee','Express','Happai']
  // data = [99,89,96,78,69,54,90,60,40,30,15,25,85,15]
  constructor(private data: *) { }

  barChartOptions : ChartOptions={responsive:true}
  barChartLabels : Label[] = this.
  barChartType : ChartType ='bar'
  barChartLegend : true
  barChartPlugins :[]
  barChartColor : Color[]=[
    {
      borderColor:'blue'
    }
  ]

  barChartData : ChartDataSets[]=[{
    data:this.data,label:'Best Frames'
  }]

  ngOnInit(): void {

  }

}