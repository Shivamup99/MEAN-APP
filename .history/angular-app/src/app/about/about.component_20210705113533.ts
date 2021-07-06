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

  someClick(info:any){
    this.message = info.id + '-'+ info.title
  }
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
        'excel'
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        // Note: In newer jQuery v3 versions, `unbind` and `bind` are 
        // deprecated in favor of `off` and `on`
        $('td', row).off('click');
        $('td', row).on('click', () => {
          self.someClickHandler(data);
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
