import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoggingComponent } from './dashboard/logging/logging.component'

const routes: Routes = [
  { path: 'dashboard/logging', component: LoggingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
