import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../employee/employee.model';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  employee: Employee; //get info from login view

  isValidata:boolean;
  errorMessage:string="";

  constructor(private auth:AuthService,private router:Router, private user:UserService) { }

  ngOnInit() {
    this.employee = new Employee();
  }

  public onLoginClick(){
    this.auth.findEmployeeDetail(this.employee)
    .subscribe(data => {
     this.user.setUserInfo(data);
      this.router.navigate(['home']); //route to home page
      this.auth.setLoggedIn(true);
    },
    error => {
        //error message
          if(error.status = 401){
            this.auth.setLoggedIn(false);
            this.isValidata=false;
            this.errorMessage = "Invalid user Id and Password";
          }
    })
  
   // this.router.navigateByUrl('/home'); //route to home page
  }


 

}
