import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
   
  constructor(private auth : AuthService, private router:Router) { }
  alert : boolean=false
  err: any
  submitted : boolean = false
  form = new FormGroup ({
    email:new FormControl("", [Validators.required,Validators.email]),
    password: new FormControl("", [Validators.required,Validators.maxLength(20),Validators.minLength(5)])
  })

  get f(){
    return this.form.controls
  }

  onSubmit(){
    this.submitted=true
    if(this.form.valid){ 
     this.auth.login(this.form.value).subscribe(res=>{
        localStorage.setItem('token',res.token)
        localStorage.setItem('_id',res._id)
        this.router.navigateByUrl("/")
       // this.location.replaceState("/")
        console.log(res)
       
      },error=>( this.err="user does not exist")

      )} else{
        return
      }
  }
  closeAlert(){
    this.err=false
  }

  googleSignin(){}

}
