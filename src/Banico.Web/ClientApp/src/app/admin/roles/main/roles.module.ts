import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientXsrfModule } from '@angular/common/http';
import { FormsModule }  from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RolesService } from './roles.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-Token'
    })  
  ],
  declarations: [
  ],
  providers: [ 
    RolesService
  ],
    bootstrap: [ 
  ]
})
export class RolesModule { }
