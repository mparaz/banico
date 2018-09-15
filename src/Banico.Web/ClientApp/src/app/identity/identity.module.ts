import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountModule } from './account/account.module';
import { ManageModule } from './manage/manage.module';

@NgModule({
    imports: [ 
        CommonModule,
        AccountModule,
        ManageModule
    ]
})
export class IdentityModule { }