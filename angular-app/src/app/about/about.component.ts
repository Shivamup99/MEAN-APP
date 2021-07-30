import { Component, OnInit ,ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ColumnMode ,SelectionType} from '@swimlane/ngx-datatable';
import { HomeService } from '../service/home.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  brandName :any;
  @ViewChild('table') table: any;
  rows = [];
  temp=[];
  selected = [];
  loadingIndicator = true;
  reorderable = true;
  selectedROw=[]
  selectedRow=[]
  row =[]
  com=[]

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  constructor(private http: HttpClient , private user: HomeService) { 
   
  }
  
  ngOnInit(): void {
    this.user.getTodo().subscribe((post:any)=>{
      this.temp = [...post]
      this.rows = post
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 1500);
     this.row = this.rows.filter((data, i, arr)=>{
      return arr.indexOf(arr.find(t => t.userId === data.userId)) === i;
   })
   this.com = this.rows.filter((cam,j,array)=>{
     return array.indexOf(array.find(l=>l.completed===cam.completed))===j;
   })
    })
  };

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter((d)=> {
      return d.title.toLowerCase().indexOf(val) !== -1 || !val
    });
    this.rows = temp;
    this.table.offset = 0;
  }

  onSelect({ selected }) {
    //console.log('Select Event', this.selected);
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  getValues() { 
   let fill=[];
   this.selectedROw.map((u)=>{
   let filter=this.temp.filter(item=>item.userId==u)
   filter.map((v)=>
       fill.push(v)
      )
   })
   this.rows = fill
  if(this.selectedROw.length==0)
  {
    this.rows=this.temp
  }
  }

  getValuesC(){
   let fillter2 = this.temp.filter(item=>item.completed==this.selectedRow)
   this.rows = fillter2
   if(this.selectedRow.length==0)
   {
     this.rows=this.temp
   }
  } 
  onRemoveRow(){
    this.selected.map((u,i)=>{
      this.rows=this.rows.filter(v=>v.id!=u.id)
    })
    
  }
}
