import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  title:'datatables'
  post;
  dataTable: any;
  dtOptions: any;
  tableData = [];
  @ViewChild('dataTable', {static: true}) table;
  constructor(private http :HttpClient) { }

  ngOnInit(): void {
    this.
    
  }
  
 
  getDataFromSource() {
    this.http.get('http://jsonplaceholder.typicode.com/todos').subscribe(data => {
      this.post= data;
      this.dtOptions = {
        data: this.tableData,
        columns: [
          {title: 'ID', data: 'id'},
          {title: 'UserId', data: 'userId'},
          {title: 'Title', data: 'title'},
          {title: 'Body', data: 'completed'},
         
        ]
      };
    }, err => {}, () => {
      this.dataTable = $(this.table.nativeElement);
      this.dataTable.DataTable(this.dtOptions);
    });
  }

}
