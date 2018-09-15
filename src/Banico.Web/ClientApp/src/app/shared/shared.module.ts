import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigService } from './utils/config.service';

@NgModule({
  imports: [ 
      CommonModule 
    ],
  providers: [
    ConfigService
    // , { 
    //   provide: HttpXhrBackend, 
    //   useClass: AuthenticateXHRBackend
    // }
  ]
})
export class SharedModule { }