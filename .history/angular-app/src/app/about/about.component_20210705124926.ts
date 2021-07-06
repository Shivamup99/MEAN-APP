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
  message=''
  dtTrigger: Subject<any> = new Subject<any>();

  someClick(info:any): void{
    this.message = info.id + '  ,  ' + info.title + '   , ' + info.completed
  }
  constructor(private http: HttpClient) { }
  
  ngOnInit(): void {
    this.dtOptions=({
      user:this.user,
      dom: 'lBfrtip',
      buttons: [ 'columnsToggle','colvis'],
      
      scrollY:300,
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
      
      language: {
        search: "_INPUT_",
        searchPlaceholder: "Search Data"
    },
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        $('td', row).off('click');
        $('td', row).on('click', () => {
          self.someClick(data);
          console.log(data)
        });
        return row;
      }
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
