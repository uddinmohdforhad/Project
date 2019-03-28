import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from './custom-material.module';

import { DashboardService } from './services/dashboard.service';

import { HeaderComponent } from './shared/header/header.component';
import { LoggingComponent } from './dashboard/logging/logging.component';
import { StaffMembersComponent } from './dashboard/staff-members/staff-members.component';
import { RegistrationComponent } from './dashboard/registration/registration.component';
import { MembersDetailsComponent } from './dashboard/staff-members/members-details/members-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoggingComponent,
    StaffMembersComponent,
    RegistrationComponent,
    MembersDetailsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomMaterialModule
  ],
  providers: [DashboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }