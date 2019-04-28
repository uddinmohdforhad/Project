import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './services/auth.guard';

import { StaffLoggingComponent } from './dashboard/logging/logging.component'
import { StaffMembersComponent } from './dashboard/staff-members/staff-members.component';
import { RegistrationComponent } from './dashboard/registration/registration.component';
import { MembersDetailsComponent } from './dashboard/staff-members/members-details/members-details.component';

import { SignUpComponent } from './website/sign-up/sign-up.component';
import { LoginComponent } from './website/login/login.component';
import { HomepageComponent } from './website/homepage/homepage.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

const routes: Routes = [
  { 
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/register',
    component: RegistrationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/logging',
    component: StaffLoggingComponent
  },
  {
    path: 'dashboard/staff-members/:id',
    component: MembersDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/staff-members',
    component: StaffMembersComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'log-in',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
