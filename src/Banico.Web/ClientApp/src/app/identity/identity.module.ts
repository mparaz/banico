import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountModule } from './account/main/account.module';
import { ManageModule } from './manage/main/manage.module';

@NgModule({
    imports: [ 
        CommonModule,
        AccountModule,
        ManageModule
    ]
})
export class IdentityModule { }