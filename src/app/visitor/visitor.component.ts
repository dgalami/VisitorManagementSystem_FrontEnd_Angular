import { Component, OnInit } from '@angular/core';
import { Visitor } from './visitor.model';
import { VisitorService } from './visitor.service';

declare var $: any;  //for jquery

@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.css']
})
export class VisitorComponent implements OnInit {

  private visitors: Visitor[];
  private rowVisitor = new Visitor();
  private addVisitor = new Visitor();

  message:string;
  errorMessage:string;
 
  displayMessage:boolean;
  displayErrorMessage:boolean;

  isadded:boolean = false;
  employeeExist:boolean = false;

  constructor(private visitorService: VisitorService) { }

  ngOnInit() {


    $("#input-search").on("keyup", function () {
      var value = $(this).val().toLowerCase();
      $("#data-table tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });

    $("#add-div").on("click", function () {
      $('#addmodal').modal('show');
    });


    this.getAllvisitor();

  }

  public getAllvisitor() {
    this.visitorService.getAllVisitor()
      .subscribe(data => {
        this.visitors = data;
        this.displayMessage = false;
        this.displayErrorMessage = false;
      })
  }

  onSelect(selectedItem: Visitor) {
    this.visitorService.getVisitorById(+selectedItem.vId)
      .subscribe(data => {
        this.rowVisitor = data;
      })
  }

  updateVisitor(){
    this.visitorService.updateVisitor(this.rowVisitor)
    .subscribe(data=> {
      this.message = "Successfully update."
      this.displayMessage = true;
    },
  error=> {
    this.errorMessage = error;
    this.displayErrorMessage = true;
  })
  }

  deleteVisitor(){
    this.visitorService.deleteVisitor(this.rowVisitor)
    .subscribe(data=> {
      this.message = "Successfully deleted";
      this.displayMessage = true;
    },
  error=> {
    this.errorMessage = error;
    this.displayErrorMessage = true;
  })
  }

  addNewVisitor(){
    this.visitorService.addNewVisitor(this.addVisitor)
    .subscribe(data=> {
      this.isadded = true;
    }, 
  error=> {
    this.isadded=false;
    if(error.status == 409){  //error : already exist
      this.isadded=false;
      this.employeeExist=true;
    }
  })
  }


closeBtn(){
    this.getAllvisitor();
  }

}
