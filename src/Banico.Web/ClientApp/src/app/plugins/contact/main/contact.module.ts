import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { ContactRoutingModule } from './contact.routing';
import { ContactComponent }  from './contact.component';
import { ContactDisplayComponent } from '../components/contactdisplay/contactdisplay.component';
import { ContactFormComponent } from '../components/contactform/contactform.component';

@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule,
    ContactRoutingModule
  ],
  declarations: [ 
    ContactComponent,
    ContactDisplayComponent,
    ContactFormComponent 
  ],
  bootstrap:    [ ContactComponent ]
})
export class ContactModule { }
