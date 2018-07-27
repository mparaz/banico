import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FrontComponent } from './front.component';

const SECTION_ROUTES: Routes = [
    { path: 'front', component: FrontComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(SECTION_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})
export class FrontRoutingModule {}