import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './services/auth.guard';
import { DashboardAuthGuard } from './services/dashboard-auth.guard';

import { AppDashboardComponent } from './dashboard/app-dashboard/app-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { StaffLoggingComponent } from './dashboard/logging/logging.component'
import { StaffMembersComponent } from './dashboard/staff-members/staff-members.component';
import { RegistrationComponent } from './dashboard/registration/registration.component';
import { MembersDetailsComponent } from './dashboard/staff-members/members-details/members-details.component';

import { AppWebComponent } from './website/app-web/app-web.component';
import { HomepageComponent } from './website/homepage/homepage.component';
import { SignUpComponent } from './website/sign-up/sign-up.component';
import { LoginComponent } from './website/login/login.component';
import { BookingComponent } from './website/booking/booking.component';
import { MyBookingsComponent } from './website/my-bookings/my-bookings.component';
import { OrderComponent } from './website/order/order.component';

const dashboard_routes: Routes = [
  { 
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [DashboardAuthGuard]
  },
  {
    path: 'dashboard/register',
    component: RegistrationComponent,
    canActivate: [DashboardAuthGuard]
  },
  {
    path: 'dashboard/logging',
    component: StaffLoggingComponent
  },
  {
    path: 'dashboard/staff-members/:id',
    component: MembersDetailsComponent,
    canActivate: [DashboardAuthGuard]
  },
  {
    path: 'dashboard/staff-members',
    component: StaffMembersComponent,
    canActivate: [DashboardAuthGuard]
  }
]

const web_routes: Routes = [
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
  {
    path: 'order/:bookId',
    component: OrderComponent,
    canActivate: [AuthGuard]
  }
]

const routes: Routes = [
  { path: '', component: AppWebComponent, data: { title: 'Customer\'s Website' }, children: web_routes },
  { path: '', component: AppDashboardComponent, data: { title: 'Staff dashboard' }, children: dashboard_routes },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
