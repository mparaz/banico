import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { DirectoryRoutingModule } from './directory.routing';
import { DirectoryComponent }  from './directory.component';
import { DirectoryDisplayComponent } from '../components/directorydisplay/directorydisplay.component';
import { DirectoryItemDisplayComponent } from '../components/directoryitemdisplay/directoryitemdisplay.component';
import { DirectoryFormComponent } from '../components/directoryform/directoryform.component';
import { DirectorySearchComponent } from '../components/directorysearch/directorysearch.component';
import { DirectoryFrontComponent } from '../components/directoryfront/directoryfront.component';

@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule,
    NgbModule,
    DirectoryRoutingModule
  ],
  declarations: [ 
    DirectoryComponent,
    DirectoryDisplayComponent,
    DirectoryItemDisplayComponent,
    DirectoryFormComponent,
    DirectoryFrontComponent,
    DirectorySearchComponent
  ],
  entryComponents: [
  ]
})
export class DirectoryModule { }
