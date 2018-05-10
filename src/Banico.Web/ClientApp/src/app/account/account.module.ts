import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { SharedModule }   from '../shared/modules/shared.module';
 
import { UserService }  from '../shared/services/user.service';
import { EmailValidator } from '../directives/email.validator.directive';

import { Routing }  from './account.routing';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResendConfirmationComponent } from './resend-confirmation/resend-confirmation.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SetPasswordComponent } from './set-password/set-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Routing,
    SharedModule
  ],
  declarations: [
    ChangePasswordComponent,
    LoginComponent, 
    RegisterComponent, 
    ResendConfirmationComponent,
    ResetPasswordComponent,
    SetPasswordComponent
  ],
  providers:    [ UserService ]
})
export class AccountModule { }
