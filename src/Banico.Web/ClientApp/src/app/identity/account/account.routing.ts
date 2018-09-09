import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountComponent } from './account.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResendConfirmationComponent } from './resend-confirmation/resend-confirmation.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

import { AuthGuard } from '../../shared/services/auth.guard';

export const ROUTES: Routes = [
  { path: 'account', component: AccountComponent, children: [
    { path: 'confirm-email', component: ConfirmEmailComponent},
    { path: 'forgot-password', component: ForgotPasswordComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'resend-confirmation', component: ResendConfirmationComponent},
    { path: 'reset-password', component: ResetPasswordComponent}
  ] }
];

@NgModule({
  imports: [
      RouterModule.forChild(ROUTES)
  ],
  exports: [
      RouterModule
  ]
})
export class AccountRoutingModule {}