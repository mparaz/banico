import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { Login } from './login.interface';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent {
  isRequesting: boolean;
  errors: string;  

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }
  
  public login(value: Login) {
    this.isRequesting = true;
    this.accountService.login(
      value.email,
      value.password
    )
    .finally(() => this.isRequesting = false)
    .subscribe(
      result  => {if(result){
          this.router.navigate(['/login'],{queryParams: {brandNew: true,email:value.email}});                         
      }},
      errors =>  this.errors = errors);

  }
}