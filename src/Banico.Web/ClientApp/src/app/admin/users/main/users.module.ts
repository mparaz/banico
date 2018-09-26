import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientXsrfModule } from '@angular/common/http';
import { FormsModule }  from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersListComponent } from '../components/userslist/userslist.component';
import { UsersService } from './users.service';

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
    UsersListComponent
  ],
  providers: [ 
    UsersService
  ],
    bootstrap: [ 
  ]
})
export class UsersModule { }
