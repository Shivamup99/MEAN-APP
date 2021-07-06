import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  alert: boolean=false
  user :any= []
  users:any =[]
  p :number =1;
  name: any;
  itemsPerPage :number=3 
  constructor(private auth:AuthService) { }

  ngOnInit() :void{
    this.auth.user().subscribe(data=>{
      this.user = data
      this.users =data
       console.log(data)
    })
  }

  onEdit(_id){
    return this.auth.editUser(_id)
  }

  onDelete(_id){
    return this.auth.deleteUser(_id).subscribe(res=>{
      alert('')
      this.user = this.user.filter(u=>u._id!= _id)
      this.alert=true
    })
  }

  closeAlert(){
    this.alert=false
  }

  key : string ='name'
  revrse : boolean=false
  
  sort(key){
   this.key=key
   this.revrse=!this.revrse
  }

  Search(){
  if(this.name===""){
    this.user=this.users
  } else{
    this.user = this.user.filter(res=>{
      return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase())
    })
  }
  }

}
