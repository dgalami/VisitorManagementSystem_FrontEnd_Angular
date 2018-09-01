import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Employee } from './employee/employee.model';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInStatus = false;

  private httpheader={headers:new HttpHeaders({'Content-type':'application/json'})};

  constructor(private http:HttpClient){}

  setLoggedIn(value:boolean){
    this.loggedInStatus = value;
  }
  get isLoggedIn(){
    return this.loggedInStatus;
  }

  findEmployeeDetail(employee:Employee):Observable<any>{
     
      return this.http.post("http://localhost:8080/employee/login", employee, this.httpheader);    
  }

}
