import { Component, OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  dtOptions : DataTables.Settings={}
  user: any =[]
  constructor(private http: HttpClient) { }
  
  ngOnInit(): void {
    this.dtOptions=({
      pagingType:'fu'
    })
    };
  
  
}