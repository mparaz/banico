import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactComponent } from './contact.component';
import { ContactDisplayComponent } from '../components/contactdisplay/contactdisplay.component';
import { ContactFormComponent } from '../components/contactform/contactform.component';

const CONTACT_ROUTES: Routes = [
  { path: 'contact', component: ContactComponent, children: [
    { path: 'new', component: ContactFormComponent },
    { path: 'edit/:alias', component: ContactFormComponent },
    { path: ':alias', component: ContactDisplayComponent }
  ] }
];

@NgModule({
    imports: [
        RouterModule.forChild(CONTACT_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})
export class ContactRoutingModule {}