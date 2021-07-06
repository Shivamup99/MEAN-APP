import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  alert : boolean=false
  err: any
  message :any
  submitted:boolean=false
  constructor(private auth : AuthService, private router:Router, private route:ActivatedRoute,private fb:FormBuilder) { 
    this.form = this.fb.group ({
      password: new FormControl("", [Validators.required,Validators.maxLength(20),Validators.minLength(5)]),
      confirmPassword: new FormControl("", [Validators.required,Validators.maxLength(20),Validators.minLength(5)])
    },{
      validator: this.MustMatch('password','confirmPassword')
    })
  }
  
  get f(){
    return this.form.controls
  }
  id: any
  token: any
  ngOnInit():void
  {
    this.id=this.route.snapshot.params._id,
    this.token=this.route.snapshot.params.token
  }

  onSubmit(){
    console.log(this.id)
    this.submitted =true
    if(this.form.valid){
     this.auth.resetPassword( this.id,this.token, this.form.value).subscribe((data)=>{
      console.log(this.route.snapshot.params._id)
     })
   }
  }
  closeAlert(){
    this.err=false
    this.message= false
  }
   
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

}
