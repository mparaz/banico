import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { PageRoutingModule } from './page.routing';
import { PageComponent }  from './page.component';
import { PageDisplayComponent } from './pagedisplay/pagedisplay.component';
import { PageFormComponent } from './pageform/pageform.component';

@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule,
    PageRoutingModule
  ],
  declarations: [ 
    PageComponent,
    PageDisplayComponent,
    PageFormComponent 
  ],
  bootstrap:    [ PageComponent ]
})
export class PageModule { }
