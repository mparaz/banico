import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InviteComponent } from './invite.component';
import { InviteFormComponent } from './inviteform/inviteform.component';

const INVITE_ROUTES: Routes = [
  { path: 'invite', component: InviteComponent, children: [
    { path: '', component: InviteFormComponent }
  ] }
];

@NgModule({
    imports: [
        RouterModule.forChild(INVITE_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})
export class InviteRoutingModule {}