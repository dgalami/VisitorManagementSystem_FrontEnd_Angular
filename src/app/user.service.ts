import { Injectable } from '@angular/core';
import { Employee } from './employee/employee.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  employee:Employee;

  constructor() { }

  setUserInfo(userInfo:Employee){
    this.employee = userInfo;
  }

  getUserInfo(){
    return this.employee;
  }
}
