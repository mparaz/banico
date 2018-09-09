import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
 
@Component({
  selector: 'resend-confirmation',
  templateUrl: './resend-confirmation.component.html',
  styleUrls: []
})
export class ResendConfirmationComponent {
  isRequesting: boolean = false;
  isSuccessful: boolean = false;
  errors: string;  

  resendConfirmationForm = this.fb.group({
    email: ['', Validators.required],
  });

  constructor(
    private accountService: AccountService,
    private router: Router,
    private fb: FormBuilder
  ) { }
  
  public resendConfirmation() {
    this.isRequesting = true;
    this.accountService.resendConfirmation(
      this.resendConfirmationForm.value['email']
    )
    .finally(() => this.isRequesting = false)
    .subscribe(
      result  => {
        if (result) {
          this.isSuccessful = true;                         
        }
      },
      errors =>  this.errors = errors);
  }
}