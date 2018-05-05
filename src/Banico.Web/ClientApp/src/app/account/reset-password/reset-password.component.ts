import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { ResetPassword } from './reset-password.interface';
 
@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: []
})
export class ResetPasswordComponent {
  isRequesting: boolean;
  isSuccessful: boolean;
  errors: string;  

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }
  
  public resetPassword(value: ResetPassword) {
    this.isRequesting = true;
    this.accountService.resetPassword(
      value.code,
      value.password,
      value.resetPassword
    )
    .finally(() => this.isRequesting = false)
    .subscribe(
      result  => {if(result){
          this.router.navigate(['/login'],{queryParams: {brandNew: true,email:value.email}});                         
      }},
      errors =>  this.errors = errors);

  }
}