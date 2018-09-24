import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';
import { FrontComponent } from './front/front.component';
import { ModalComponent } from './modal/modal.component';
import { NavBarComponent } from './navbar/navbar.component';
import { NavMenuComponent } from './navmenu/navmenu.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { NavBarService } from './navbar/navbar.service';

@NgModule({
    imports: [ 
        CommonModule,
        PipesModule
    ],
    declarations: [ 
        FrontComponent,
        ModalComponent,
        NavBarComponent,
        NavMenuComponent,
        SpinnerComponent,
    ],
    exports: [
        NavBarComponent,
        NavMenuComponent
    ],
    providers: [
        NavBarService
    ]
})
export class ShellModule { }