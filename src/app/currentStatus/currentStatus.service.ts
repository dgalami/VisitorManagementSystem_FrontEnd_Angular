import { OnInit, Injectable } from "@angular/core";
import { HttpHeaders, HttpParams, HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { LogVisitor } from "../log.model";
import { catchError } from "rxjs/operators";

@Injectable()
export class CurrentStatusService implements OnInit{

    private httpheader={headers:new HttpHeaders({'Content-type':'application/json'})};

    constructor(private http:HttpClient){}

    ngOnInit(){

    }

    public getAllLoggedIn():Observable<LogVisitor[]>{
        const params:HttpParams = new HttpParams()
        return this.http.get<LogVisitor[]>("http://localhost:8080/log/getLoggedIn", {params}).pipe(
            catchError(this.errorHandler));
    }

    public getAllLoggedOut():Observable<LogVisitor[]>{
        const params:HttpParams = new HttpParams()
        return this.http.get<LogVisitor[]>("http://localhost:8080/log/getLoggedOut", {params}).pipe(
            catchError(this.errorHandler));
    }


     //handle error 
     errorHandler(error: HttpErrorResponse){
        return Observable.throw(error.message || "Server Error");
    }

}