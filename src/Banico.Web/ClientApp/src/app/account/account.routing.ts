import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';

import { LoginComponent }    from './login/login.component';
import { RegisterComponent }    from './register/register.component';
import { ResetPasswordComponent }    from './reset-password/reset-password.component';

export const Routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'reset-password', component: ResetPasswordComponent}
]);