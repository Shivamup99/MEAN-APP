import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  title:'datatables'
  post;
  dtOptions: any;
  
  constructor(private http :HttpClient) { }

  ngOnInit(): void {
    this.dtOptions={
      pagingType:'full_numbers',
      pageLength:5,
      processing:true
    }

    this.http.get('http://jsonplaceholder.typicode.com/todos').subscribe((posts:any)=>{
      this.post = posts; $(function(){
        $("#about").DataTable();
       });
      console.log(this.post)
    })

    
    
  }
  
}
