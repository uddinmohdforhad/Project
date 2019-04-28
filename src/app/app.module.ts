import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from './custom-material.module';

import { DashboardService } from './services/dashboard.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';

import { HeaderComponent } from './shared/header/header.component';
import { StaffLoggingComponent } from './dashboard/logging/logging.component';
import { StaffMembersComponent } from './dashboard/staff-members/staff-members.component';
import { RegistrationComponent } from './dashboard/registration/registration.component';
import { MembersDetailsComponent } from './dashboard/staff-members/members-details/members-details.component';
import { UpdateMemberDetailsDialogComponent } from './dashboard/staff-members/update-member-details-dialog/update-member-details-dialog.component';
import { SignUpComponent } from './website/sign-up/sign-up.component';
import { LoginComponent } from './website/login/login.component';
import { HomepageComponent } from './website/homepage/homepage.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { BookingComponent } from './website/booking/booking.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StaffLoggingComponent,
    StaffMembersComponent,
    RegistrationComponent,
    MembersDetailsComponent,
    UpdateMemberDetailsDialogComponent,
    SignUpComponent,
    LoginComponent,
    HomepageComponent,
    DashboardComponent,
    BookingComponent
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
  entryComponents: [ 
    UpdateMemberDetailsDialogComponent, 
  ],
  providers: [
    DashboardService,
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }