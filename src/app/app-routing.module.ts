import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './services/auth.guard';
import { DashboardGuard } from './services/dashboard.guard';

import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { StaffLoggingComponent } from './dashboard/logging/logging.component'
import { StaffMembersComponent } from './dashboard/staff-members/staff-members.component';
import { RegistrationComponent } from './dashboard/registration/registration.component';
import { MembersDetailsComponent } from './dashboard/staff-members/members-details/members-details.component';

import { HomepageComponent } from './website/homepage/homepage.component';
import { SignUpComponent } from './website/sign-up/sign-up.component';
import { LoginComponent } from './website/login/login.component';
import { BookingComponent } from './website/booking/booking.component';
import { MyBookingsComponent } from './website/my-bookings/my-bookings.component';

const routes: Routes = [
  { 
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [DashboardGuard]
  },
  {
    path: 'dashboard/register',
    component: RegistrationComponent,
    canActivate: [DashboardGuard]
  },
  {
    path: 'dashboard/logging',
    component: StaffLoggingComponent
  },
  {
    path: 'dashboard/staff-members/:id',
    component: MembersDetailsComponent,
    canActivate: [DashboardGuard]
  },
  {
    path: 'dashboard/staff-members',
    component: StaffMembersComponent,
    canActivate: [DashboardGuard]
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
  {
    path: 'book-table',
    component: BookingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'my-bookings',
    component: MyBookingsComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
