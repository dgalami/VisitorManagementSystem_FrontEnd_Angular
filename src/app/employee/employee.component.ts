import { Component, OnInit } from '@angular/core';
import { Employee } from './employee.model';
import { EmployeeService } from './employee.service';
import { NgForm } from '@angular/forms';

declare var $:any;  //for jquery

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  private employee = new Employee();  //add new
  private employees:Employee[];  //get all employee from database and store in array

  rowEmployee = new Employee(); //update


  constructor(private employeeService:EmployeeService) { }

  private employeeError = new Employee(); //hold the error message from back end for addnew

  private isadded:boolean=false;
  private employeeExist:boolean=false;
  private isUpdate:boolean=false;
  private isDeleted:boolean=false;

  private errorMessage:string;  //error message from get
  private message:string; //success message

  displayMessage: boolean = false;
  displayErrorMessage: boolean = false;

  ngOnInit() {

    //search display
    $("#input-search").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#data-table tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
    //display add modal
    $("#add-div").on("click", function(){
      $('#addmodal').modal('show');
    });

  
   
   this.getAllEmployee();

  }
  onSelect(selectedItem: Employee) {
    this.employeeService.getEmployeeById(+selectedItem.eId)
    .subscribe(data=> {
      this.rowEmployee = data;
    })
}

   //find all employee and store in array to display in table
   getAllEmployee(){
    this.employeeService.getAllEmployee()
   .subscribe(data=> {
     this.employees = data;
     this.isUpdate=false;
     this.isDeleted=false;
     this.displayMessage = false;
     this.displayErrorMessage = false;
   })
   }
   

  addNewEmployee(addForm:NgForm){
    this.employeeService.addNewEmployee(this.employee)
    .subscribe(data=> {
      this.employee = new Employee(); //after added reset the employee object
      this.isadded=true;
      this.employeeExist=false;
      this.employeeError = new Employee();
      addForm.reset();
    },
  error=>{
    this.employeeError=error.error;
    this.isadded=false;
    if(error.status == 409){  //error : already exist
      this.employeeExist=true;
    } 
  })
  }

  //update employee --> isUpdate is true
  updateEmployee(){
    this.employeeService.updateEmployee(this.rowEmployee)
    .subscribe(data=> {
      this.isUpdate = true;
      this.message = "Successfully Updated";
      this.errorMessage = "";
      this.displayMessage = true;
    },
    error=>{
      this.isUpdate = false;
      //display error message--update fail!
      this.message = "";
      this.errorMessage = "Update Fail!";
      this.displayErrorMessage = true;
    })
  }


  //delete employee --> isDeleted is true
  deleteEmployee(){
    this.employeeService.deleteEmployee(this.rowEmployee)
    .subscribe(data=> {
      this.isDeleted = true;
      this.message = "Successfully deleted";
      this.errorMessage = "";
      this.displayMessage = true;
    },
  error => {
    this.isDeleted = false;
    //display error message --> unable to delete
    this.message = "";
    this.errorMessage = "Unable to delete";
    this.displayErrorMessage = true;
  })
  }

  closeBtn(){
    this.getAllEmployee();
  }


}
