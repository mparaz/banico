import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { SectionRoutingModule } from './section.routing';
import { SectionListComponent } from './sectionlist/sectionlist.component';
import { SectionAdminComponent } from './sectionadmin/sectionadmin.component';
import { SectionItemAdminComponent } from './sectionitemadmin/sectionitemadmin.component';

import { SectionService } from './services/section.service';
import { SectionFileService } from './services/sectionfile.service';

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
   ],
   providers: [
     SectionService,
     SectionFileService
   ]   
})
export class SectionModule { }
