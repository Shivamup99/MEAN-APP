import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{
  alert: boolean = false
  submitted:boolean=false
  constructor(private auth:AuthService , private activeRouter:ActivatedRoute , private router:Router) { }

  form = new FormGroup({
    name: new FormControl("",[Validators.required , Validators.minLength(3),Validators.maxLength(30)]),
    email: new FormControl("",[Validators.email , Validators.required]),
    mobile: new FormControl("",[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
  })

  get f(){
    return this.form.controls
  }

  ngOnInit(): void{
    console.log(this.activeRouter.snapshot.params._id)
    this.auth.editUser(this.activeRouter.snapshot.params._id).subscribe((res:any)=>{
      this.form = new FormGroup({
        name: new FormControl(res['name']),
        email: new FormControl(res['email']),
        mobile: new FormControl(res['mobile'])
    })
    
  })
}
  onUpdate(){
    this.submitted=true
    if(this.form.valid){
    this.auth.updateUser(this.activeRouter.snapshot.params._id ,this.form.value).subscribe(res=>{
      console.log(res)
       this.router.navigate(['/'])
       this.alert = true
    })
  } else{
    return
  }
  }

  closeAlert(){
    this.alert=false
  }
}
