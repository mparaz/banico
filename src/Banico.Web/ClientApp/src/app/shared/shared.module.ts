import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigService } from './utils/config.service';
import { WindowRefService } from './services/windowref.service';

@NgModule({
  imports: [ 
      CommonModule 
    ],
  providers: [
    ConfigService,
    WindowRefService
    // , { 
    //   provide: HttpXhrBackend, 
    //   useClass: AuthenticateXHRBackend
    // }
  ]
})
export class SharedModule { }