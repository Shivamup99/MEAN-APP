import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { baseUrl } from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http : HttpClient) { }

  user(): Observable<any>{
    let token = localStorage.getItem('token')
    return this.http.get('http://localhost:4000/api/data/user',{
      headers: new HttpHeaders({
        Authorization:`Bearer ${token}`
      })
    })
  }
  
  editUser(_id:string): Observable<any>{
    let token = localStorage.getItem('token')
    return this.http.get('http://localhost:4000/api/data/user/'+_id,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
  }

  updateUser(_id:string , data): Observable<any>{
    let token = localStorage.getItem('token')
    return this.http.put('http://localhost:4000/api/data/user/'+_id, data,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
  }

  deleteUser(_id:string): Observable<any>{
    let token = localStorage.getItem('token')
    return this.http.delete('http://localhost:4000/api/data/user/'+_id,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
  }
   
  personalDetail(data): Observable<any>{
    let token = localStorage.getItem('token')
    return this.http.post('http://localhost:4000/api/data/personal',data,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
  }

  personalDetailsEdit(_id :string,data): Observable<any>{
    let token = localStorage.getItem('token')
    return this.http.put('http://localhost:4000/api/data/personal/'+_id,data,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
  }

  personalDetailID(_id :string): Observable<any>{
    let token = localStorage.getItem('token')
    return this.http.get('http://localhost:4000/api/data/personal/'+_id,{
      headers:{
        Authorization : `Bearer ${token}`
      }
    })
  }


  register(data) :Observable<any>{
    return this.http.post('http://localhost:4000/api/data/user',data)
  }

  login(data) :Observable <any>{
     return this.http.post('http://localhost:4000/api/data/userLogin',data)
  }

  forgotPassword(data): Observable <any>{
    return this.http.put('http://localhost:4000/api/data/forgetPass',data)
  }
  
  resetPassword(_id:string,token:string,data): Observable<any>{
    return this.http.put('http://localhost:4000/api/data/resetPassword/'+_id+'/'+token,data)

}
}
