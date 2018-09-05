import { BrowserModule } from '@angular/platform-browser';
import { Inject, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpXhrBackend } from '@angular/common/http';
//import { AuthenticateXHRBackend } from './authenticate-xhr.backend';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { SharedModule } from './shared/shared.module';
import { AccountModule }  from './account/account.module';
import { ManageModule } from './manage/manage.module';
import { NavBarModule } from './components/navbar/navbar.module';
import { SectionModule } from './components/section/section.module';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent
  ],
  imports: [
    SharedModule,
    AccountModule,
    ManageModule,
    NavBarModule,
    SectionModule,
    BrowserModule.withServerTransition({ appId: 'Banico.Web' }),
    HttpClientModule,
    FormsModule,
    ApolloModule,
    HttpLinkModule,
    AppRoutingModule
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
