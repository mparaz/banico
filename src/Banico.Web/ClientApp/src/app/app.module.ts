import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, XHRBackend } from '@angular/http';
import { AuthenticateXHRBackend } from './authenticate-xhr.backend';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './approuting.module';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';

import { AccountModule }  from './account/account.module';
import { ConfigService } from './shared/utils/config.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent
  ],
  imports: [
    AccountModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    ConfigService, { 
      provide: XHRBackend, 
      useClass: AuthenticateXHRBackend
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
