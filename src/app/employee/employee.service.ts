import { OnInit, Injectable } from "@angular/core";
import {HttpClient ,HttpParams, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Employee } from "./employee.model";
import { Observable } from "rxjs";
import { catchError } from 'rxjs/operators';


@Injectable()
export class EmployeeService implements OnInit {
    private httpheader={headers:new HttpHeaders({'Content-type':'application/json'})};


    constructor(private http:HttpClient) {}

    ngOnInit(){
     
    }

    //add new employee
    public addNewEmployee(employee){
        return this.http.post("http://localhost:8080/employee/addNewEmployee",employee,this.httpheader);
    }

    //find all employee
    public getAllEmployee():Observable<Employee[]>{
        const params:HttpParams = new HttpParams()
        return this.http.get<Employee[]>("http://localhost:8080/employee/getAll", {params});
                
    }

    //update employee
    public updateEmployee(employee:Employee):Observable<any>{
        return this.http.put("http://localhost:8080/employee/update", employee, this.httpheader).pipe(
            catchError(this.errorHandler));
    }

    //delete employee
    public deleteEmployee(employee:Employee):Observable<any>{
        return this.http.delete("http://localhost:8080/employee/delete" + "/" + employee.eId, this.httpheader).pipe(
            catchError(this.errorHandler));
    }

    //get employee by id
    public getEmployeeById(id:any):Observable<Employee>{
        return this.http.get<Employee>("http://localhost:8080/employee/findById" + "/" + id, this.httpheader).pipe(
            catchError(this.errorHandler));
    }


    //handle error 
    errorHandler(error: HttpErrorResponse){
        return Observable.throw(error.message || "Server Error");
    }


   

}