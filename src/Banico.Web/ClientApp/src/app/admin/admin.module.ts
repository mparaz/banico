import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SectionsModule } from './sections/sections.module';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
    imports: [ 
        SectionsModule
    ]
})
export class AdminModule { }