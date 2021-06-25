import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrls: ['./personal-form.component.css']
})
export class PersonalFormComponent implements OnInit {
  alert : boolean=false
 reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
 image :any;
 file: File=null
 submitted:boolean = false
  constructor(private auth :AuthService , private route:Router) { }

  ngOnInit(): void {
  }

  personalForm = new FormGroup({
    github: new FormControl("",[Validators.required,Validators.pattern(this.reg)]),
    linkdin : new FormControl("",[Validators.required,Validators.pattern(this.reg)]),
    work : new FormControl("",[Validators.required,Validators.minLength(4)]),
    country: new FormControl("",[Validators.required ,Validators.minLength(4)]),
    address:new FormControl("",[Validators.required, Validators.minLength(4),Validators.maxLength(40)]),
    postCode :new FormControl("",[Validators.required]),
    birthDate:new FormControl("",[Validators.required]),
    profile:new FormControl("",[Validators.required, Validators.minLength(10),Validators.maxLength(300)]), 
    image:new FormControl ("",[Validators.required]),
    confirm:new FormControl ("",[Validators.required])
  })

  get f(){
    return this.personalForm.controls
  }

  selectImage(event :any){
    
        let file =event.target.files[0]
        this.personalForm.get('image').setValue(file)
      
  }

  onSubmit(){
    let formData = new FormData()
    formData.append('github',this.personalForm.get('github').value)
    formData.append('linkdin',this.personalForm.get('linkdin').value)
    formData.append('work',this.personalForm.get('work').value)
    formData.append('country',this.personalForm.get('country').value)
    formData.append('address',this.personalForm.get('address').value)
    formData.append('postCode',this.personalForm.get('postCode').value)
    formData.append('birthDate',this.personalForm.get('birthDate').value)
    formData.append('profile',this.personalForm.get('profile').value)
    formData.append('image',this.personalForm.get('image').value)

    return this.auth.personalDetail(formData).subscribe((data: any)=>{
      this.alert=true
        console.log(data)
        this.route.navigate(['/'])
    })

  }

  closeAlert(){
    this.alert=false
  }

}
