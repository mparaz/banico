import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecodeUriPipe } from './pipes/decodeuri.pipe';
import { ConfigService } from './utils/config.service';

@NgModule({
  imports: [ 
      CommonModule 
    ],
  declarations: [ 
      DecodeUriPipe 
    ],
  exports: [ 
      DecodeUriPipe 
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