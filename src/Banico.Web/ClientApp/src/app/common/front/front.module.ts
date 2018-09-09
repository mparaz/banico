import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { FrontRoutingModule } from './front.routing';
import { FrontComponent } from './front.component';

@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule,
    FrontRoutingModule
  ],
  declarations: [ 
    FrontComponent 
   ]
})
export class FrontModule { }
