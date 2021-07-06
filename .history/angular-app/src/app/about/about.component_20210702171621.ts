import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  title:'datatables'
  dtOptions: DataTables.Settings = {};
  post;
  constructor(private http :HttpClient) { }

  ngOnInit(): void {
    this.dtOptions={
      pagingType:'full_numbers',
      pageLength:5,
      processing:true
    }

    this.http.get('http://jsonplaceholder.typicode.com/posts').subscribe((posts:any)=>{
      this.post = posts
    })
  }


}
