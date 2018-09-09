import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { NavBarComponent } from './navbar.component';
import { NavBarService } from './navbar.service';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  exports: [
    NavBarComponent
  ],
  imports: [ 
    SharedModule,
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
