import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PageModule } from './page/page.module';
import { ContentItemService } from './services/contentItem.service';

@NgModule({
    imports: [ 
        CommonModule,
        PageModule 
    ],
    providers: [ 
        ContentItemService
    ]
})
export class PluginsModule { }