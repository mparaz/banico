import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientXsrfModule } from '@angular/common/http';
import { FormsModule }  from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule }   from '../../../shared/modules/shared.module';
import { AccountService }  from './account.service';
import { UserService }  from '../../../shared/services/user.service';
import { EmailValidator } from '../../../directives/email.validator.directive';
import { AuthGuard } from '../../../shared/services/auth.guard';

import { AccountRoutingModule }  from './account.routing';
import { AccountComponent } from './account.component';
import { ConfirmEmailComponent } from '../components/confirm-email/confirm-email.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { ResendConfirmationComponent } from '../components/resend-confirmation/resend-confirmation.component';
import { ResetPasswordComponent } from '../components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from '../components/forgot-password/forgot-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    SharedModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-Token'
    })  
  ],
  declarations: [
    AccountComponent,
    ConfirmEmailComponent,
    LoginComponent, 
    RegisterComponent, 
    ResendConfirmationComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
  ],
  providers: [ 
    AccountService,
    UserService,
    AuthGuard
  ],
    bootstrap: [ 
      AccountComponent 
  ]
})
export class AccountModule { }
