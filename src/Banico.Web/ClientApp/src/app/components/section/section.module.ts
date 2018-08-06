import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { SectionRoutingModule } from './section.routing';
import { SectionListComponent } from './sectionlist/sectionlist.component';
import { SectionAdminComponent } from './sectionadmin/sectionadmin.component';
import { SectionItemAdminComponent } from './sectionitemadmin/sectionitemadmin.component';

@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule,
    SectionRoutingModule
  ],
  declarations: [ 
    SectionListComponent,
    SectionAdminComponent,
    SectionItemAdminComponent 
   ]
})
export class SectionModule { }
