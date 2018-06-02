import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Register } from './register.interface';
import { AccountService } from '../account.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: []
})
export class RegisterComponent implements OnInit {
    isRequesting: boolean = false;
    isSuccessful: boolean = false;
    errors: string;  
    submitted: boolean = false;

    constructor (
        private accountService: AccountService,
        private router: Router
    ) { 
    }

    ngOnInit() {
    }
  
    public cleanStringify(object) {
        if (object && typeof object === 'object') {
            object = copyWithoutCircularReferences([object], object);
        }
        return JSON.stringify(object);
    
        function copyWithoutCircularReferences(references, object) {
            var cleanObject = {};
            Object.keys(object).forEach(function(key) {
                var value = object[key];
                if (value && typeof value === 'object') {
                    if (references.indexOf(value) < 0) {
                        references.push(value);
                        cleanObject[key] = copyWithoutCircularReferences(references, value);
                        references.pop();
                    } else {
                        cleanObject[key] = '###_Circular_###';
                    }
                } else if (typeof value !== 'function') {
                    cleanObject[key] = value;
                }
            });
            return cleanObject;
        }
    }

    public async register(
      form: NgForm
    ) {
        this.submitted = true;
        this.isRequesting = true;
        this.errors = '';
        var value = form.value;
        var valid = form.valid;
        //if (valid) {
            this.isRequesting = true;
            this.accountService.register(
                value.email,
                value.password,
                value.confirmPassword,
                value.inviteCode
            )
            .finally(() => this.isRequesting = false)
            .subscribe(result  => {
                this.isRequesting = false;
                this.isSuccessful = true;
                alert(this.cleanStringify(result));
            },
            errors =>  this.errors = errors);
                    // this.router.navigate(['/login'], {
                    //     queryParams: {
                    //         brandNew: true,
                    //         email:value.email
                    //     }
                    // }); 
    }
}
