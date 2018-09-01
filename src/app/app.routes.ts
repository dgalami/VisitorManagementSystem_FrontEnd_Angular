
import { Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CurrentStatusComponent } from './currentStatus/currentStatus.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { EmployeeComponent } from './employee/employee.component';
import { VisitorComponent } from './visitor/visitor.component';
import { AppointmentComponent } from './appointment/appointment.component';

export const routes:Routes = [
    {path: '', redirectTo: 'login', pathMatch:'full'},
    
    {path:"login", component:LogInComponent},

    {path: 'home', component: HomeComponent,
        canActivate:[AuthGuard],
        children: [
            {path: '', redirectTo: 'dashboard', pathMatch: "full"},
            {path:"dashboard",component:DashboardComponent},
            {path:"currentStatus",component:CurrentStatusComponent},
            {path: "visitor", component:VisitorComponent},
            {path: "employee", component:EmployeeComponent},
            {path: "appointment", component: AppointmentComponent},
        ]
    },
    
    {path: '**', component:PageNotFoundComponent}
]