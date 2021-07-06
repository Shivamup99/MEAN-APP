import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit , OnDestroy {
  dtOptions: any = {};
  user: any =[]
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private http: HttpClient) { }
  
  ngOnInit(): void {
    this.dtOptions=({
      columns: [{
        title: 'ID',
        data: 'id'
      }, {
        title: 'UserID',
        data: 'userId'
      }, {
        title: 'Title',
        data: 'title'
      }, {
        title: 'Completed',
        data: 'completed'
      }],
      pagingType: 'full_numbers',
      pageLength:5,
    })

    this.http.get('https://jsonplaceholder.typicode.com/todos').subscribe((data:any)=>{
       this.user = data
       this.dtTrigger.next()
       console.log(this.user)
    })
    };
   
    ngOnDestroy(){
      return this.dtTrigger.unsubscribe()
    }

  
  
}
