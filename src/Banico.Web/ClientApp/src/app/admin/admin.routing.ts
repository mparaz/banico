import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { SectionsAdminComponent } from './sections/components/sectionsadmin/sectionsadmin.component';
import { SectionItemsAdminComponent } from './sections/components/sectionitemsadmin/sectionitemsadmin.component';
import { UsersListComponent } from './users/components/userslist/userslist.component';

const ADMIN_ROUTES: Routes = [
    { path: 'admin', component: AdminComponent },
    { path: 'admin/sections/section/:section', component: SectionItemsAdminComponent },
    { path: 'admin/sections/:path', component: SectionItemsAdminComponent },
    { path: 'admin/sections', component: SectionsAdminComponent },
    { path: 'admin/users', component: UsersListComponent}];

@NgModule({
    imports: [
        RouterModule.forChild(ADMIN_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule {}