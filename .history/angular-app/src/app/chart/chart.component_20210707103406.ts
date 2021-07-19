import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import {Color, Label } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
   coCase =[]
   coCountry =[]

  constructor(private http: HttpClient) { }

  barChartOptions : ChartOptions={responsive:true}
  barChartLabels : Label[] = this.coCountry
  barChartType : ChartType =''
  barChartLegend : true
  barChartPlugins :[]

  barChartData : ChartDataSets[]=[
    {
    data:this.coCase, label:'Current Status'
  }
]

  ngOnInit(): void {
   
   this.http.get('https://corona.lmao.ninja/v2/countries?yesterday=true&sort').subscribe((res:any)=>{
   for(let dataObj of res)  {
     this.coCase.push(dataObj.active)
     this.coCountry.push(dataObj.country)
   }
     console.log(res)
   })
  }

}
