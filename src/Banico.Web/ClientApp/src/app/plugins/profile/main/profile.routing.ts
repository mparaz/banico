import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { ProfileDisplayComponent } from '../components/profiledisplay/profiledisplay.component';
import { ProfileFormComponent } from '../components/profileform/profileform.component';

const PROFILE_ROUTES: Routes = [
  { path: 'profile', component: ProfileComponent, children: [
    { path: 'edit', component: ProfileFormComponent },
    { path: ':alias', component: ProfileDisplayComponent },
    { path: '', component: ProfileDisplayComponent }
] }
];

@NgModule({
    imports: [
        RouterModule.forChild(PROFILE_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})
export class ProfileRoutingModule {}