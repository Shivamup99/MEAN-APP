import { Component, OnInit,OnDestroy  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Subject} from 'rxjs'
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit ,OnDestroy {
  title = 'datatables';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  post;
  
  constructor(private http: HttpClient) { }
  
  ngOnInit(): void {
    };
  
  
}
