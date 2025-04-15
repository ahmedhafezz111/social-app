import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userData:any = null
  router = inject(Router)
  constructor(private httpClient:HttpClient) { }


  signUp(data:object):Observable<any>{
    return this.httpClient.post(environment.baseUrl+`/users/signup`,data)
  }

  signIn(data:object):Observable<any>{
    return this.httpClient.post(environment.baseUrl+`/users/signin`,data)
  }

  changePassword(data:object):Observable<any>{
    return this.httpClient.patch(environment.baseUrl+`/users/change-password`,data)
  }
  
  uploadProfilePhoto(data:object):Observable<any>{
    return this.httpClient.put(environment.baseUrl+`/users/upload-photo`,data)
  }

  getLoggedUser():Observable<any>{
    return this.httpClient.get(environment.baseUrl+`/users/profile-data`)
  }

  logOut():void{
    localStorage.removeItem("socialToken")
    this.userData = null
    this.router.navigate(['/login'])
  }
  saveUserData():void{
    if(localStorage.getItem("socialToken") !== null){
        this.userData = jwtDecode(localStorage.getItem("socialToken") !)
        console.log('userData', this.userData);
        
    }
  }
}
