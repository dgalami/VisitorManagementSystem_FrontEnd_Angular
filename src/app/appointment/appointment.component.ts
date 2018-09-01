import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee/employee.model';
import { AppointmentService } from './appointment.service';
import { Visitor } from '../visitor/visitor.model';
import { LogVisitor } from '../log.model';
import { VisitorService } from '../visitor/visitor.service';
import { TempLog } from '../visitor/TempLog.model';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  //for multiselector 
  dropdownList = null;
  selectedItems = [];
  dropdownSettings = {};
  //end multiselector

  private newAppointment = new TempLog();
  private employees: Employee[];
  private visitors: Visitor[];
  private expectedAppointment: LogVisitor[];
  logList:boolean=false;
  isAdded:boolean=false;


  // private visitor: Visitor;

  constructor(private appointmentService: AppointmentService, private visitorService:VisitorService) { }

  ngOnInit() {

    this.getAllEmployee();
    this.getAllVisitor();
    this.getLoggedIn();

    //get Visitors from database
    // for(var i = 0; i < this.visitors.length; i++){
    //   this.dropdownList = { item_id: this.visitors[i].vId , item_text: this.visitors[i].firstName + " " + this.visitors[i].lastName }
    // }
    // this.dropdownList = [
    //   // { item_id: 1, item_text: 'Deepak' },
    //   // { item_id: 2, item_text: 'Stephen' },
    //   // { item_id: 3, item_text: 'David' },
    //   // { item_id: 4, item_text: 'Maria' },
    //   { item_id: 5, item_text: 'John' }
    // ];

    this.selectedItems = [
      // { item_id: 3, item_text: 'David' },
      // { item_id: 4, item_text: 'Maria' }
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };


  }

  onItemSelect(item: any) {
    // console.log(item);
  }
  onSelectAll(items: any) {
    // console.log(items);
  }




  getAllEmployee() {
    this.appointmentService.getAllEmployee()
      .subscribe(data => {
        this.employees = data;
      })
  }

  getAllVisitor() {
    this.appointmentService.getAllVisitor()
      .subscribe(data => {
        this.visitors = data;
        
       this.updateDropDownList(this.visitors);
      })
  }
  updateDropDownList(visitors:Visitor[]){
    let temp = [];

    visitors.forEach(e => {
      temp.push( { item_id: e.vId, item_text: e.firstName });
    })

    this.dropdownList = temp;
  }

  getLoggedIn(){
    this.appointmentService.getExpectedAppointment()
    .subscribe(data=> {
      this.expectedAppointment = data;
      this.logList = true;

    }, 
  error=> {
    if(error.status = 204){
      //no content
      this.logList = false;
    }
  })
  }

  // getVisitorById(id){
  //   this.visitorService.getVisitorById(id)
  //   .subscribe(data=> {
  //     this.visitor = data;
  //   })
  // }


  addNewAppointment(){
    console.log(this.newAppointment);
    console.log(this.newAppointment.reason);
    this.newAppointment.checkedIn = false;
    this.appointmentService.addNewAppointment(this.newAppointment)
     .subscribe(data=> {
       this.isAdded = true;
       this.getLoggedIn();
     },
    error=> {
      this.isAdded = true;
    })
    
  }

  deleteAppointment(id){
    this.appointmentService.deleteAppointment(id)
    .subscribe(data=> {
      this.getLoggedIn();
    })
    
  }

}


