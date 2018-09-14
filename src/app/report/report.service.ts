import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LogVisitor } from '../log.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private httpheader={headers:new HttpHeaders({'Content-type':'application/json'})};

  constructor(private http:HttpClient) { }

  public getAllLogged():Observable<LogVisitor[]>{
    return this.http.get<LogVisitor[]>("http://localhost:8080/log/getAllLogged", this.httpheader);
  }
}
