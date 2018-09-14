import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CurrentStatusComponent } from './currentStatus/currentStatus.component';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeService } from './employee/employee.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { UserService } from './user.service';
import { VisitorComponent } from './visitor/visitor.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { VisitorService } from './visitor/visitor.service';
import { AppointmentService } from './appointment/appointment.service';
import { CurrentStatusService } from './currentStatus/currentStatus.service';
import { DashboardService } from './dashboard/dashboard.service';
import { ReportComponent } from './report/report.component';
import { ReportService } from './report/report.service';
import { DatePipe } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    DashboardComponent,
    CurrentStatusComponent,
    PageNotFoundComponent,
    HomeComponent,
    EmployeeComponent,
    VisitorComponent,
    AppointmentComponent,
    ReportComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    NgMultiSelectDropDownModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    EmployeeService,
    AuthService,
    AuthGuard, 
    UserService, 
    VisitorService, 
    AppointmentService,
    CurrentStatusService,
    DashboardService,
    ReportService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
