import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../account.service';
import { Login } from './login.interface';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent {
  isRequesting: boolean = false;
  isSuccessful: boolean = false;
  errors: string;  
  returnUrl: string = '/';

  constructor(
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  
  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        if (params.returnUrl) {
          this.returnUrl = params.returnUrl;
        }
      });
  }
  
  public login(
    form: NgForm
  ) {
    this.isRequesting = true;
    var value = form.value;
    var valid = form.valid;
    this.accountService.login(
      value.email,
      value.password
    )
    .finally(() => this.isRequesting = false)
    .subscribe(
      result  => {
        if (result) {
          var myResult: any = result;
          window.localStorage.setItem('auth_token', myResult.auth_token);
          this.isSuccessful = true;
          this.router.navigate([this.returnUrl]);                         
        } else {
        }
      },
      errors => {
        this.errors = errors;
      });
  }
}