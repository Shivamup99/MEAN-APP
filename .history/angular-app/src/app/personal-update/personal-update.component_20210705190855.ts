import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { FormGroup, FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-update',
  templateUrl: './personal-update.component.html',
  styleUrls: ['./personal-update.component.css']
})
export class PersonalUpdateComponent implements OnInit {
  alert : boolean=false
  reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
 image :any;
 file: File=null
  constructor(private auth :AuthService, private route:ActivatedRoute,private router :Router) { }
  
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
    this.personalForm.get('http://localhost:image').setValue(file)
  
}
  ngOnInit(): void {
    console.log(this.route.snapshot.params._d)
    this.auth.personalDetailID(this.route.snapshot.params._id).subscribe((data:any)=>{
      this.personalForm = new FormGroup({
        github: new FormControl(data['github']),
        linkdin : new FormControl(data['linkdin']),
        work : new FormControl(data['work']),
        country: new FormControl(data['country']),
        address:new FormControl(data['address']),
        postCode :new FormControl(data['postCode']),
        birthDate :new FormControl(data['birthDate']),
        profile:new FormControl(data['profile']),
        image:new FormControl (data['image'])
      })
    })
  }

  onSubmit(){
    let formData = new FormData()
    let d = this.personalForm.get('birthDate').value

  
    formData.append('github',this.personalForm.get('github').value)
    formData.append('linkdin',this.personalForm.get('linkdin').value)
    formData.append('work',this.personalForm.get('work').value)
    formData.append('country',this.personalForm.get('country').value)
    formData.append('address',this.personalForm.get('address').value)
    formData.append('postCode',this.personalForm.get('postCode').value)
    formData.append('birthDate',this.personalForm.get('birthDate').value)
    formData.append('profile',this.personalForm.get('profile').value)
    formData.append('image',this.personalForm.get('image').value)

    return this.auth.personalDetailsEdit(this.route.snapshot.params._id, formData).subscribe((data: any)=>{
        console.log(data)
        this.alert=true
        this.router.navigate(['/'])
        //this.route.navigate(['/about/me/:_id'])
    })
  }
  closeAlert(){
    this.alert=false
  }
}
