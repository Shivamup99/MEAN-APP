import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  user :any
  url:any = 'http://localhost:4000/'
  _id:any

  constructor(private auth:AuthService, private route:ActivatedRoute) { }
  ngOnInit(): void {
    this._id = this.route.snapshot.params['_id']
    this.getOne()
  }
  
  getOne(){
    this.auth.editUser(this._id).subscribe((data: any)=>{
      this.user = data
      console.log(this.user)
    })
  }

  
}
