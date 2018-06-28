import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { SharedModule }   from '../shared/modules/shared.module';
 
import { AccountService }  from './account.service';
import { UserService }  from '../shared/services/user.service';
import { EmailValidator } from '../directives/email.validator.directive';
import { AuthGuard } from '../shared/services/auth.guard';

import { AccountRoutingModule }  from './account.routing';
import { AccountComponent } from './account.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResendConfirmationComponent } from './resend-confirmation/resend-confirmation.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AccountRoutingModule,
    SharedModule
  ],
  declarations: [
    AccountComponent,
    ChangePasswordComponent,
    ConfirmEmailComponent,
    LoginComponent, 
    RegisterComponent, 
    ResendConfirmationComponent,
    ResetPasswordComponent,
    SetPasswordComponent,
    ForgotPasswordComponent
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
