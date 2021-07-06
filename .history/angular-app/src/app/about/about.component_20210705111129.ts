import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import 'datatables.net-buttons/js/buttons.colVis.min';
import 'datatables.net-buttons/js/dataTables.buttons.min';
import 'datatables.net-buttons/js/buttons.flash.min';
import 'datatables.net-buttons/js/buttons.html5.min';
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
      dom: 'lBfrtip',
      buttons: [
        'columnsToggle',
        'colvis',
        'copy',
        'print',
        'excel',
        {
          text: 'Some button',
          key: '1',
          action: function (e, dt, node, config) {
            alert('Button activated');
          }
        }
      ]
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
