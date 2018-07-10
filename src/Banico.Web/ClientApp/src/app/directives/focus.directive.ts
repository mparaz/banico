import { Directive, ElementRef, Renderer2, OnInit } from "@angular/core";

@Directive({ selector: '[tmFocus]' })

export class myFocus implements OnInit {
    constructor(private el: ElementRef, private renderer: Renderer2) {
        // focus won't work at construction time - too early
    }

    ngOnInit() {
        //this.renderer.invokeElementMethod(this.el.nativeElement, 'focus', []);
        let onElement = this.renderer.selectRootElement(this.el.nativeElement);
        onElement.focus();
    }
}