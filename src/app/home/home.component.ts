import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Employee } from '../employee/employee.model';

declare var $:any;  //for jquery


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  employee:Employee;

  constructor(private user:UserService) {
   }

  ngOnInit() {
    this.employee = this.user.getUserInfo();


    $('#sideNavebar li').click(function() {
      $(this).siblings().find('a').removeClass('selected');
      $(this).find('a').addClass('selected');
      
    });
  }


}
