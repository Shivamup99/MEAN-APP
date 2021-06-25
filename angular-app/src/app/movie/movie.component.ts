import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
 display  :any
  constructor() { }

  ngOnInit(): void {
  }
  openModal(){
    this.display='block'
  }
  onCloseHandled(){
    this.display='none'
  }
  
}
