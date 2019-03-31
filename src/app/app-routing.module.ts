import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffLoggingComponent } from './dashboard/logging/logging.component'
import { StaffMembersComponent } from './dashboard/staff-members/staff-members.component';
import { RegistrationComponent } from './dashboard/registration/registration.component';
import { MembersDetailsComponent } from './dashboard/staff-members/members-details/members-details.component';

import { SignUpComponent } from './website/sign-up/sign-up.component';
import { LoginComponent } from './website/login/login.component';

const routes: Routes = [
  { path: 'dashboard', redirectTo: '/dashboard/logging', pathMatch: 'full' },
  { path: 'dashboard/register', component: RegistrationComponent },
  { path: 'dashboard/logging', component: StaffLoggingComponent },
  { path: 'dashboard/staff-members/:id', component: MembersDetailsComponent },
  { path: 'dashboard/staff-members', component: StaffMembersComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'log-in', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
