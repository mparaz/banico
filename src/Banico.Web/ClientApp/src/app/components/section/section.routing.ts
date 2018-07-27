import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SectionListComponent } from './sectionlist/sectionlist.component';
import { SectionTypeAdminComponent } from './sectiontypeadmin/sectiontypeadmin.component';
import { SectionAdminComponent } from './sectionadmin/sectionadmin.component';

const SECTION_ROUTES: Routes = [
    { path: 'section/admin/type/:type', component: SectionAdminComponent },
    { path: 'section/admin/:path', component: SectionAdminComponent },
    { path: 'section/admin', component: SectionTypeAdminComponent }//,
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