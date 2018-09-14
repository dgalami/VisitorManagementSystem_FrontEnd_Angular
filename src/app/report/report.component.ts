import { Component, OnInit } from '@angular/core';
import { ReportService } from './report.service';
import { LogVisitor } from '../log.model';
import { Visitor } from '../visitor/visitor.model';
import { Employee } from '../employee/employee.model';
import { VisitorService } from '../visitor/visitor.service';
import { EmployeeService } from '../employee/employee.service';
import { DatePipe } from '@angular/common';

declare var xepOnline:any;

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  logVisitor: LogVisitor[];
  tempLog: LogVisitor[];
  isNotFound: boolean = false;

  dateFrom: string;
  dateTo: string;
  today:any;
  vList: Visitor[];
  eList: Employee[];

  visitId:number;
  empId:number;

  constructor(private reportService: ReportService,
    private visitorService: VisitorService,
    private employeeService: EmployeeService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.getAllLogged();
    this.getAllVisitor();
    this.getAllEmployee();

    
  }
  setVId(id:any):void{
    this.visitId = id;
    console.log(this.visitId);
  }
  setEId(id:any):void{
    this.empId = id;
    console.log(this.empId);
  }


  get dateT(){
    if (this.dateTo) {
      console.log(this.dateTo);
      return this.dateTo;
    } else {
      var now = new Date();
      this.today = this.datePipe.transform(now, 'yyyy-mm-dd');
      console.log(this.today);
      return this.today;
    }
  }

  search() {
    if (this.dateFrom && this.dateTo) {
      if(this.visitId){
        this.tempLog = this.tempLog.filter(log => log.vId === this.visitId);
      } else if(this.empId){
        this.tempLog = this.tempLog.filter(log => log.eId === this.empId);
      }
      this.logVisitor = this.tempLog.filter(log => log.logDate >= this.dateFrom && log.logDate <= this.dateT);
      
    } else {
      this.logVisitor = this.tempLog; //display all
    }
  }
 

  getAllLogged() {
    this.reportService.getAllLogged()
      .subscribe(data => {
          this.tempLog = data;
      })
  }

  display() {
    
    if(this.tempLog){
      // this.logVisitor = this.tempLog;
      this.search();
      console.log(this.visitId);
      console.log(this.empId);
      
    } else{
      this.isNotFound = true;
    }
    
   
  }

  getAllEmployee() {
    this.employeeService.getAllEmployee()
      .subscribe(data => {
        if (data) {
          this.eList = data;
        }
      })
  }

  getAllVisitor() {
    this.visitorService.getAllVisitor()
      .subscribe(data => {
        if (data) {
          this.vList = data;
        }
      })
  }

  downloadToPDF(){
    return xepOnline.Formatter.Format('body-div', {render: 'download'});
  }

}
