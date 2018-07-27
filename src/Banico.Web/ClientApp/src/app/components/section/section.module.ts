import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { SectionRoutingModule } from './section.routing';
import { SectionListComponent } from './sectionlist/sectionlist.component';
import { SectionTypeAdminComponent } from './sectiontypeadmin/sectiontypeadmin.component';
import { SectionAdminComponent } from './sectionadmin/sectionadmin.component';

@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule,
    SectionRoutingModule
  ],
  declarations: [ 
    SectionListComponent,
    SectionTypeAdminComponent,
    SectionAdminComponent 
   ]
})
export class SectionModule { }
