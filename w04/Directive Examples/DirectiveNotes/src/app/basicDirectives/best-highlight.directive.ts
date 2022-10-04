import { Directive, ElementRef, Host, HostBinding, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBestHighlight]'
})
export class BestHighlightDirective implements OnInit {
  //Hostbinding will let us set our CSS features to make hostlistener cleaner
  //hostbinding does not use dashes
  @HostBinding('style.backgroundColor') backgroundColor: string = 'transparent';
  @HostBinding('style.padding') padding: string = '1rem'; // = '1rem' sets the default

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
    //we still need ElementRef for our ngOnInit hook, and Renderer2 used to 
    //be RendererV2.
    }

    ngOnInit() {}

    //Decorators
    //Hostlistener will listen for events
    @HostListener('mouseenter') mouseover(eventData: Event) {
        this.backgroundColor = 'blue';

    }
    @HostListener('mouseleave') mouseleave(eventData: Event) {
        this.backgroundColor = 'transparent';
        
    }
}
