import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as toastr from 'toastr';

import { AccountService } from '../../main/account.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: []
})
export class RegisterComponent implements OnInit {
    isRequesting: boolean = false;
    isSuccessful: boolean = false;
    errors: string[][] = [,];
    submitted: boolean = false;

    registerForm = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        code: ['', Validators.required]
    });

    constructor (
        private accountService: AccountService,
        private router: Router,
        private fb: FormBuilder
    ) { 
    }

    ngOnInit() {
        toastr.options = {
            preventDuplicates: true,
            timeOut: 0,
            extendedTimeOut: 0,
            closeButton: true
          };    
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

    public async register() {
        this.submitted = true;
        this.isRequesting = true;
        this.errors = [,];
        //if (valid) {
            this.isRequesting = true;
            this.accountService.register(
                this.registerForm.value['email'],
                this.registerForm.value['password'],
                this.registerForm.value['confirmPassword'],
                this.registerForm.value['code']
            )
            .finally(() => this.isRequesting = false)
            .subscribe(
                result  => {
                    this.isRequesting = false;
                    this.isSuccessful = true;
                },
                err => {
                    let validationErrorDictionary = err;
                    //JSON.parse(err);
                    for (var fieldName in validationErrorDictionary) {
                        if (validationErrorDictionary.hasOwnProperty(fieldName)) {
                            //if (form.controls[fieldName]) {
                                // integrate into angular's validation if we have field validation
                                //form.controls[fieldName].setErrors({ invalid: true });
                            //}
                            // if we have cross field validation then show the validation error at the top of the screen
                            var error: string[] = [];
                            error.push(validationErrorDictionary[fieldName]);
                            this.errors[fieldName] = [];
                            this.errors[fieldName].push(error);
                        }
                    }

                    this.errors[''].forEach(error => toastr.error(error));
                });
                    // this.router.navigate(['/login'], {
                    //     queryParams: {
                    //         brandNew: true,
                    //         email:value.email
                    //     }
                    // }); 
    }
}
