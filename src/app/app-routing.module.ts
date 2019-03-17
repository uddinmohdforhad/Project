import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoggingComponent } from './dashboard/logging/logging.component'
import { StaffMembersComponent } from './dashboard/staff-members/staff-members.component';

const routes: Routes = [
  { path: 'dashboard', redirectTo: '/dashboard/logging', pathMatch: 'full' },
  { path: 'dashboard/logging', component: LoggingComponent },
  { path: 'dashboard/staff-members', component: StaffMembersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
