import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormControl ,FormGroup ,Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {
  err :any
  message : any
  constructor(private auth :AuthService) { }
   submitted:boolean=false
  form = new FormGroup ({
    email:new FormControl("", [Validators.required,Validators.email]),
  })

  get f(){
    return this.form.controls
  }

  ngOnInit(): void {  }

  onSubmit(){
    this.submitted=true
    if(this.form.valid){
    this.auth.forgotPassword(this.form.value).subscribe((data)=>{
      console.log(data)
      this.message = "message send to your mail"
    },error=>( this.err="in - valid email")
    )
  }
  }
  closeAlert(){
    this.err =false
    this.message=false
  }


}
