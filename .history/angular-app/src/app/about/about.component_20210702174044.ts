import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  title:'datatables'
  dtOptions: any = {};
  post;
  constructor(private http :HttpClient) { }

  ngOnInit(): void {
    this.dtOptions={
      pagingType:'full_numbers',
      pageLength:5,
      processing:true
    }

    this.http.get('http://jsonplaceholder.typicode.com/todos').subscribe((posts:any)=>{
      this.post = posts; $(function(){
        $("#about").DataTable({
          columns: [
            {title:"Name", data: "name" },
            {title:"Position",data: "hr.position" },
            {title:"Start date",data: "hr.start_date" },
            {title:"Salary", data: "hr.salary" },
            {title:"Office", data: "contact.0" },
            {title:"Extn", data :"contact.1" }
        ],
        });
       });
      console.log(this.post)
    })
    
  }
  


}
