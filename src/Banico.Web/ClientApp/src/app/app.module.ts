import { BrowserModule } from '@angular/platform-browser';
import { Inject, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpXhrBackend } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { AuthenticateXHRBackend } from './authenticate-xhr.backend';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { SharedModule } from './shared/shared.module';

import { AccountModule }  from './identity/account/account.module';
import { ManageModule } from './identity/manage/manage.module';

import { NavBarModule } from './common/navbar/navbar.module';
import { SectionModule } from './common/section/section.module';

import { PluginsModule } from '../app/plugins/plugins.module';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'Banico.Web' }),
    HttpClientModule,
    FormsModule,
    ApolloModule,
    HttpLinkModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    SharedModule,
    AccountModule,
    ManageModule,
    NavBarModule,
    SectionModule,
    PluginsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
    ,@Inject('BASE_URL') private baseUrl: string
  ) { 
    apollo.create({
      link: httpLink.create({ uri: baseUrl + 'api/GraphQL' }),
      cache: new InMemoryCache()
    });
  }
}
