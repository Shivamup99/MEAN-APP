import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HomeService } from '../service/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  book : any
  name: any;
  showAdd: boolean
  showUpdate:boolean
  p: number=1
  itemsPerPage :number=4 
  constructor(private book_service:HomeService , private route:Router) { }

  ngOnInit(): void {
    this.book_service.getBook().subscribe((data:any)=>{
      this.book = data
      console.log(data)
    })
  }

  bookForm = new FormGroup({
    book_name: new FormControl("",[Validators.required,Validators.min(4),Validators.max(56)]),
    author: new FormControl("",[Validators.required,Validators.min(4),Validators.max(36)]),
    book_type:  new FormControl("",[Validators.required,Validators.min(4),Validators.max(36)]),
    rating: new FormControl("",[Validators.required]) ,
    desc : new FormControl("",[Validators.required,Validators.min(10)])
  })

  get f(){
    return this.bookForm.controls
  }

   clickBook(){
    this.bookForm.reset()
    this.showAdd=true
    this.showUpdate=false
   }

  onSubmit(){
    if(this.bookForm.valid){
     this.book_service.postBook(this.bookForm.value).subscribe((data:any)=>{
       let ref = document.getElementById('cancel')
       ref?.click()
       this.ngOnInit()
      console.log(data)
    })
  }
  }

  removeBook(data:any){
    return this.book_service.deleteBook(data._id).subscribe(res=>{
      alert('click okay to delete book');
      this.ngOnInit()
    })
  }
  
  getBookById(data:any){
    this.showAdd=false
    this.showUpdate=true
    this.book = data._id
    return this.book_service.getBookID(data._id).subscribe(res=>{
      this.bookForm = new FormGroup({
        book_name: new FormControl(res['book_name']),
        author: new FormControl(res['author']),
        book_type: new FormControl(res['book_type']),
        rating: new FormControl(res['rating']),
        desc: new FormControl(res['desc']),
      })
      console.log(res)
    })
  }

  updateBook(){
    return this.book_service.putBook(this.book._id,this.bookForm.value).subscribe((res:any)=>{
      console.log(res)
    })
  }
}
