import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { NavBarComponent } from './navbar.component';
import { NavBarService } from './navbar.service';

@NgModule({
  exports: [
    NavBarComponent
  ],
  imports: [ 
    BrowserModule,
    FormsModule
  ],
  declarations: [ 
    NavBarComponent 
  ],
  providers: [
    NavBarService
  ]
})
export class NavBarModule { }
