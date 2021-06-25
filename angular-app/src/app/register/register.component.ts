import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',                                                                          
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  err: any
  submitted: boolean = false
  constructor(private auth:AuthService , private router:Router) { }

  form = new FormGroup({
    name: new FormControl("",[Validators.required , Validators.minLength(3),Validators.maxLength(30)]),
    email: new FormControl("",[Validators.email , Validators.required]),
    mobile: new FormControl("",[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
    password: new FormControl("",[Validators.required , Validators.minLength(5),Validators.maxLength(20)])
  })

  get f(){
    return this.form.controls
  }

  onSubmit(){
    this.submitted=true
    if(this.form.valid){
    this.auth.register(this.form.value).subscribe((res:any)=>{
      console.log(res)
      this.router.navigate(['/login'])
    }, error => ( this.err="user allready exist")
    )} else{
      return
    }
  }

  closeAlert(){
    this.err=false
  }

 
}
