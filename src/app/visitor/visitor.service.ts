import { OnInit, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from "@angular/common/http";
import { Visitor } from "./visitor.model";
import { catchError } from "rxjs/operators";


@Injectable()
export class VisitorService implements OnInit{

    private httpheader={headers:new HttpHeaders({'Content-type':'application/json'})};

    constructor(private http:HttpClient){}

    ngOnInit(){

    }

    //get all visitors
    public getAllVisitor():Observable<Visitor[]>{
        const params:HttpParams = new HttpParams()
        return this.http.get<Visitor[]>("http://localhost:8080/visitor/getAll", {params});
    }

    //get by id
    public getVisitorById(id: number):Observable<Visitor>{
       return this.http.get<Visitor>("http://localhost:8080/visitor/findById" + "/" + id, this.httpheader).pipe(
        catchError(this.errorHandler));
    }

    public updateVisitor(visitor:Visitor):Observable<any>{
        return this.http.put("http://localhost:8080/visitor/update",visitor, this.httpheader).pipe(
            catchError(this.errorHandler));
    }

    public deleteVisitor(visitor:Visitor):Observable<any>{
        return this.http.delete("http://localhost:8080/visitor/delete" + "/" + visitor.vId, this.httpheader).pipe(
            catchError(this.errorHandler)
        );
    }
    public addNewVisitor(visitor:Visitor){
        return this.http.post("http://localhost:8080/visitor/save", visitor, this.httpheader).pipe(
            catchError(this.errorHandler)
        );
    }


    //handle error 
    errorHandler(error: HttpErrorResponse){
        return Observable.throw(error.message || "Server Error");
    }

}