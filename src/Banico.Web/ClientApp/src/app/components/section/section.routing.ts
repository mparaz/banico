import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SectionListComponent } from './sectionlist/sectionlist.component';
import { SectionAdminComponent } from './sectionadmin/sectionadmin.component';
import { SectionItemAdminComponent } from './sectionitemadmin/sectionitemadmin.component';

const SECTION_ROUTES: Routes = [
    { path: 'section/admin/section/:section', component: SectionItemAdminComponent },
    { path: 'section/admin/:path', component: SectionItemAdminComponent },
    { path: 'section/admin', component: SectionAdminComponent }//,
    //{ path: 'section', component: SectionListComponent, children: [ { path: '**' } ] }
];

@NgModule({
    imports: [
        RouterModule.forChild(SECTION_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})
export class SectionRoutingModule {}