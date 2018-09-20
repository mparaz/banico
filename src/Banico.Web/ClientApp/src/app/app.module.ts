import { BrowserModule } from '@angular/platform-browser';
import { Inject, NgModule } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpXhrBackend } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { AuthenticateXHRBackend } from './authenticate-xhr.backend';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { IdentityModule } from './identity/identity.module';
import { PipesModule } from './pipes/pipes.module';
import { PluginsModule } from './plugins/plugins.module';
import { SharedModule } from './shared/shared.module';
import { ShellModule } from './shell/shell.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'Banico.Web' }),
    HttpClientModule,
    FormsModule,
    ApolloModule,
    HttpLinkModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    IdentityModule,
    PipesModule,
    PluginsModule,
    SharedModule,
    ShellModule
  ],
  providers: [
    Location, {
      provide: LocationStrategy, 
      useClass: PathLocationStrategy
    }
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
