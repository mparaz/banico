import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserRegistration } from '../../shared/models/user.registration.interface';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: []
})
export class RegistrationFormComponent implements OnInit {
    isRequesting: boolean;
    isSuccessful: boolean;
    errors: string;  
    submitted: boolean = false;

    constructor (
        private userService: UserService,
        private router: Router
    ) { 
    }

  public registerUser(
      value: UserRegistration, 
      valid: boolean
    ) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';
    if (valid) {
        this.isRequesting = true;
        this.userService.register(
            value.email,
            value.password,
            value.code
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
