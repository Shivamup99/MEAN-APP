import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getBook(){
    let token = localStorage.getItem('token')
    return this.http.get('http://localhost:4000/api/data/book',{
      headers:{Authorization:`Bearer ${token}`}
    })
  }


  getBookID(_id:string){
    let token = localStorage.getItem('token')
    return this.http.get('http://localhost:4000/api/data/book/'+_id,{
      headers:{Authorization:`Bearer ${token}`}
    })
  }

  postBook(data){
    let token = localStorage.getItem('token')
    return this.http.post('http://localhost:4000/api/data/book',data,{
      headers:{Authorization:`Bearer ${token}`}
    })
  }

  putBook(_id :string,data){
    let token = localStorage.getItem('token')
    return this.http.put('http://localhost:4000/api/data/book/'+_id,data,{
      headers:{Authorization:`Bearer ${token}`}
    })
  }

  deleteBook(_id:string){
    let token = localStorage.getItem('token')
    return this.http.delete('http://localhost:4000/api/data/book/'+_id,{
      headers:{Authorization:`Bearer ${token}`}
    })
  }

  
    getTodo(){
      return this.http.get('https://jsonplaceholder.typicode.com/todos')
    }
}
