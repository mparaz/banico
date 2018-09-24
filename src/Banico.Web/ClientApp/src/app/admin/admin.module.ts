import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SectionsModule } from './sections/main/sections.module';
import { PipesModule } from '../pipes/pipes.module';

import { AdminRoutingModule } from './admin.routing';
import { AdminComponent } from './admin/admin.component';

@NgModule({
    imports: [ 
        BrowserModule,
        FormsModule,
        AdminRoutingModule,
        SectionsModule
    ],
    declarations: [ 
        AdminComponent
    ]
})
export class AdminModule { }