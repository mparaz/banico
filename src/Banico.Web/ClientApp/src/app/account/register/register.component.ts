import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Register } from './register.interface';
import { AccountService } from '../account.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: []
})
export class RegisterComponent implements OnInit {
    isRequesting: boolean;
    isSuccessful: boolean;
    errors: string;  
    submitted: boolean = false;

    constructor (
        private accountService: AccountService,
        private router: Router
    ) { 
    }

    ngOnInit() {
    }
  
    public registerUser(
      value: Register, 
      valid: boolean
    ) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';
    if (valid) {
        this.isRequesting = true;
        this.accountService.register(
            value.email,
            value.password,
            value.confirmPassword,
            value.inviteCode
        )
        .finally(() => this.isRequesting = false)
        .subscribe(result  => {
            if (result) {
                this.router.navigate(['/login'], {
                    queryParams: {
                        brandNew: true,
                        email:value.email
                    }
                }); 
            }
        },
        errors =>  this.errors = errors);
    }      
 } 

   

}
