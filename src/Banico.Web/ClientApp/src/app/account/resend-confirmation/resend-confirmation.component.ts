import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { ResendConfirmation } from './resend-confirmation.interface';
 
@Component({
  selector: 'resend-confirmation',
  templateUrl: './resend-confirmation.component.html',
  styleUrls: []
})
export class ResendConfirmationComponent {
  isRequesting: boolean;
  isSuccessful: boolean;
  errors: string;  

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }
  
  public resendConfirmation(value: ResendConfirmation) {
    this.isRequesting = true;
    this.accountService.resendConfirmation(
      value.email
    )
    .finally(() => this.isRequesting = false)
    .subscribe(
      result  => {if(result){
          this.router.navigate(['/login'],{queryParams: {brandNew: true,email:value.email}});                         
      }},
      errors =>  this.errors = errors);

  }
}