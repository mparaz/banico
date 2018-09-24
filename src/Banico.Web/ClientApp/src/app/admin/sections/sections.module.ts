import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { SectionsRoutingModule } from './sections.routing';
import { SectionsAdminComponent } from './sectionsadmin/sectionsadmin.component';
import { SectionItemsAdminComponent } from './sectionitemsadmin/sectionitemsadmin.component';

import { SectionsService } from './services/sections.service';
import { SectionsFileService } from './services/sectionsfile.service';

@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule,
    SectionsRoutingModule
  ],
  declarations: [ 
    SectionsAdminComponent,
    SectionItemsAdminComponent 
   ],
   providers: [
     SectionsService,
     SectionsFileService
   ]   
})
export class SectionsModule { }
