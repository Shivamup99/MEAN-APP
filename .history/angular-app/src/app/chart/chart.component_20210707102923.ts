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
   lan =['React','Angular','Node','Python','Ruby','Mongo','Java','Php','Vue','Flutter','Native','Cofee','Express','Happai']
   data = [99,89,96,78,69,54,90,60,40,30,15,25,85,15]
   data2 = [79,69,66,98,19,44,80,20,90,50,75,15,65,45]
   

  constructor(private http: HttpClient) { }

  barChartOptions : ChartOptions={responsive:true}
  barChartLabels : Label[] = this.lan
  barChartType : ChartType ='bar'
  barChartLegend : true
  barChartPlugins :[]

  barChartData : ChartDataSets[]=[
    {
    data:this.data, label:'Current Status'
  },{
    data:this.data2, label:'Begining Status'
  }
]

  ngOnInit(): void {
    let coCase =[]
    let country =[]
   this.http.get('https://corona.lmao.ninja/v2/countries?yesterday=true&sort').subscribe((res:any)=>{
   for(let dataObj of res)  {
     coCase.push(dataObj.c)
   }
   this.data = res.data.push('userId')
     console.log(this.data)
   })
  }

}
