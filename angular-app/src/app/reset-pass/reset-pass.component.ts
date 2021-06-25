import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent {
  form: FormGroup = new FormGroup({});
  alert : boolean=false
  err: any
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

  onSubmit(){
    this.submitted =true
    if(this.form.valid){
     console.log(this.route.snapshot.params.token)
     this.auth.resetPassword(this.route.snapshot.params.token,this.form.value).subscribe((data)=>{
       console.log(data)
     })
    } else{ return}
   }
  closeAlert(){
    this.err=false
  }
   
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

}
