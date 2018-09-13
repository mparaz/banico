import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageComponent } from './page.component';
import { PageDisplayComponent } from '../components/pagedisplay/pagedisplay.component';
import { PageFormComponent } from '../components/pageform/pageform.component';

const PAGE_ROUTES: Routes = [
  { path: 'page', component: PageComponent, children: [
    { path: 'new', component: PageFormComponent },
    { path: 'edit/:alias', component: PageFormComponent },
    { path: ':alias', component: PageDisplayComponent }
  ] }
];

@NgModule({
    imports: [
        RouterModule.forChild(PAGE_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})
export class PageRoutingModule {}