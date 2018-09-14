import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContentItemService } from './services/contentItem.service';

import { ContactModule } from './contact/main/contact.module';
import { DirectoryModule } from './directory/main/directory.module';
import { FaqModule } from './faq/main/faq.module';
import { InviteModule } from './invite/main/invite.module';
import { PageModule } from './page/main/page.module';
import { ProfileModule } from './profile/main/profile.module';

@NgModule({
    imports: [ 
        CommonModule,
        ContactModule,
        DirectoryModule,
        FaqModule,
        InviteModule,
        PageModule,
        ProfileModule
    ],
    providers: [ 
        ContentItemService
    ]
})
export class PluginsModule { }