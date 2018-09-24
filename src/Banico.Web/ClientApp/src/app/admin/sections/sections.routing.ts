import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SectionsAdminComponent } from './sectionsadmin/sectionsadmin.component';
import { SectionItemsAdminComponent } from './sectionitemsadmin/sectionitemsadmin.component';

const SECTION_ROUTES: Routes = [
    { path: 'sections/admin/section/:section', component: SectionItemsAdminComponent },
    { path: 'sections/admin/:path', component: SectionItemsAdminComponent },
    { path: 'sections/admin', component: SectionsAdminComponent }];

@NgModule({
    imports: [
        RouterModule.forChild(SECTION_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})
export class SectionsRoutingModule {}