import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpXhrBackend } from '@angular/common/http';
//import { AuthenticateXHRBackend } from './authenticate-xhr.backend';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { AppRoutingModule } from './approuting.module';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { CounterComponent } from './counter/counter.component';

import { AccountModule }  from './account/account.module';
import { ManageModule } from './manage/manage.module';
import { ConfigService } from './shared/utils/config.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    CounterComponent,
  ],
  imports: [
    AccountModule,
    ManageModule,
    BrowserModule.withServerTransition({ appId: 'Banico.Web' }),
    HttpClientModule,
    FormsModule,
    ApolloModule,
    HttpLinkModule,
    AppRoutingModule
  ],
  providers: [
    ConfigService
    // , { 
    //   provide: HttpXhrBackend, 
    //   useClass: AuthenticateXHRBackend
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) { 
    apollo.create({
      link: httpLink.create({ uri: '[URL]' }),
      cache: new InMemoryCache()
    });
  }
}
