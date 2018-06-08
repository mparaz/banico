import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: []
})
export class ConfirmEmailComponent {
  isRequesting: boolean;
  errors: string;  

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  public confirmEmail(value: string) {
    this.isRequesting = true;
    this.accountService.confirmEmail(
      value
    )
    .finally(() => this.isRequesting = false)
    .subscribe(
      result  => {
        if (result){
          this.router.navigate(
            ['/login'],
            {
              queryParams: {
                brandNew: true,
                email:value
              }
            }
          );                         
      }},
      errors =>  this.errors = errors);
  }
}