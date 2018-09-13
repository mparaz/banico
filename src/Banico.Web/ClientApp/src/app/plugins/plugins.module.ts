import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContentItemService } from './services/contentItem.service';

import { DirectoryModule } from './directory/main/directory.module';
import { PageModule } from './page/main/page.module';

@NgModule({
    imports: [ 
        CommonModule,
        DirectoryModule,
        PageModule
    ],
    providers: [ 
        ContentItemService
    ]
})
export class PluginsModule { }