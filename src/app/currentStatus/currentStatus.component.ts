

import { Component, OnInit } from '@angular/core';
import { CurrentStatusService } from './currentStatus.service';
import { LogVisitor } from '../log.model';

@Component({
  selector: 'current-status',
  templateUrl: './currentStatus.component.html',
  styleUrls: ['./currentStatus.component.css']
})
export class CurrentStatusComponent implements OnInit {

  private loggedInVisitor:LogVisitor[];
  private loggedOutVisitor:LogVisitor[];

  constructor(private currentStatusService: CurrentStatusService) { }

  ngOnInit() {
    this.getLoggedIn();
    this.getLoggedOut();
  }

  //get visitor logged in (current date)
getLoggedIn(){
  this.currentStatusService.getAllLoggedIn()
  .subscribe(data=> {
    this.loggedInVisitor = data;
  })
}

  //get visitor logged out (current date)
  getLoggedOut(){
    this.currentStatusService.getAllLoggedOut()
    .subscribe(data=> {
      this.loggedOutVisitor = data;
    })
  }

}