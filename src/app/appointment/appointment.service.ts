import { OnInit, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { Employee } from "../employee/employee.model";
import { Visitor } from "../visitor/visitor.model";
import { LogVisitor } from "../log.model";
import { catchError } from "rxjs/operators";
import { TempLog } from "../visitor/TempLog.model";



@Injectable()
export class AppointmentService implements OnInit{

    private httpheader={headers:new HttpHeaders({'Content-type':'application/json'})};
    
    constructor(private http:HttpClient){}

    ngOnInit(){

    }

    public getAllEmployee():Observable<Employee[]>{
        const params:HttpParams = new HttpParams()
        return this.http.get<Employee[]>("http://localhost:8080/employee/getAll", {params}).pipe(
            catchError(this.errorHandler));
    }

    public getAllVisitor():Observable<Visitor[]>{
        const params:HttpParams = new HttpParams()
        return this.http.get<Visitor[]>("http://localhost:8080/visitor/getAll", {params}).pipe(
            catchError(this.errorHandler));
    }

    
    public getExpectedAppointment():Observable<LogVisitor[]>{
        const params:HttpParams = new HttpParams()
        return this.http.get<LogVisitor[]>("http://localhost:8080/log/getAllAppointment", {params}).pipe(
            catchError(this.errorHandler));
    }

    public addNewAppointment(tempLog:TempLog){
        return this.http.post("http://localhost:8080/log/saveLog",tempLog,this.httpheader).pipe(
            catchError(this.errorHandler));
    }

    public deleteAppointment(id:number):Observable<any>{
        return this.http.delete("http://localhost:8080/log/deleteLog" + "/" + id, this.httpheader).pipe(
            catchError(this.errorHandler));
    }

      //handle error 
      errorHandler(error: HttpErrorResponse){
        return Observable.throw(error.message || "Server Error");
    }
}