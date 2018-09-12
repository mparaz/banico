import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DirectoryComponent } from './directory.component';
import { DirectorySearchComponent } from './directorysearch/directorysearch.component';
import { DirectoryDisplayComponent } from './directorydisplay/directorydisplay.component';
import { DirectoryItemDisplayComponent } from './directoryitemdisplay/directoryitemdisplay.component';
import { DirectoryFormComponent } from './directoryform/directoryform.component';
import { DirectoryFrontComponent } from './directoryfront/directoryfront.component';

const LIST_ROUTES: Routes = [
  { path: 'directory', component: DirectoryComponent, children: [
    { path: 'new/:path', component: DirectoryFormComponent },
    { path: 'search/:search', component: DirectorySearchComponent },
    { path: 'item/:id', component: DirectoryItemDisplayComponent },
    { path: 'edit/:id', component: DirectoryFormComponent },
    { path: ':path', component: DirectoryDisplayComponent },
    { path: '', component: DirectoryFrontComponent }, 
    { path: '**', component: DirectoryDisplayComponent }
] }
];

@NgModule({
    imports: [
        RouterModule.forChild(LIST_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})
export class DirectoryRoutingModule {}