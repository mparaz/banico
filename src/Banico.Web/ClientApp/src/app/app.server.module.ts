// https://docs.microsoft.com/en-us/aspnet/core/spa/angular?view=aspnetcore-2.1&tabs=visual-studio
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

@NgModule({
    imports: [
        AppModule, 
        ServerModule, 
        ModuleMapLoaderModule
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppServerModule { }