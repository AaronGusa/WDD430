import { Directive, OnInit, ElementRef, Renderer2, HostListener } from '@angular/core';
import { Event } from '@angular/router';
//By importing renderer2 we can follow a better practice for implementing our directives

@Directive({
    selector: '[appBetterHighlight]'
})

export class BetterHighlightDirective implements OnInit {
    


    constructor(private elRef: ElementRef, private renderer: Renderer2) {
        //we still need ElementRef for our ngOnInit hook, and Renderer2 used to 
        //be RendererV2.
    }

    ngOnInit() {
        //this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue')
        //this.renderer.setStyle(this.elRef.nativeElement, 'color', 'white')
        //setStyle() has arguments, check the documentation popup for order.
    }

    //Decorators
    //Hostlistener will listen for events
    @HostListener('mouseenter') mouseover(eventData: Event) {
        this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'red')
        this.renderer.setStyle(this.elRef.nativeElement, 'color', 'white')

    }
    @HostListener('mouseleave') mouseleave(eventData: Event) {
        this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent')
        this.renderer.setStyle(this.elRef.nativeElement, 'color', 'black')
        
    }
}