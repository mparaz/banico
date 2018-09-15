import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { DecodeUriPipe } from './decodeuri.pipe';

@NgModule({
    declarations: [
        DecodeUriPipe
    ],
    imports: [
        CommonModule
    ],
    exports:[
        DecodeUriPipe
    ]
})
export class PipesModule { }