import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FaqComponent } from './faq.component';
import { FaqDisplayComponent } from '../components/faqdisplay/faqdisplay.component';
import { FaqFormComponent } from '../components//faqform/faqform.component';

const FAQ_ROUTES: Routes = [
  { path: 'faq', component: FaqComponent, children: [
    { path: 'new', component: FaqFormComponent },
    { path: 'edit/:alias', component: FaqFormComponent },
    { path: ':alias', component: FaqDisplayComponent }
  ] }
];

@NgModule({
    imports: [
        RouterModule.forChild(FAQ_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})
export class FaqRoutingModule {}