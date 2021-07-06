import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router) { }
  logout(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }
  ngOnInit(): void {
    this.out();
  }
  

  isLoggedin(){
   return localStorage.getItem('token')
  
  }
   
 out(){
  setInterval(function() {
    localStorage.clear()
    let ref = document.getElementById('autologOut')
    ref?.click
    this.router.navigate(['/login'])
  }, 5000);
 }

}
