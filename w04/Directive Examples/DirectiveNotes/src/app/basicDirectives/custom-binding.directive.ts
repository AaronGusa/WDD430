import { Directive, 
  ElementRef, 
  HostBinding, 
  HostListener, 
  Input, 
  OnInit, 
  Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCustomBinding]'
})
export class CustomBindingDirective implements OnInit {
  @Input() defaultColor: string = 'transparent';
  @Input() highlightColor: string = 'pink';

  @HostBinding('style.backgroundColor') backgroundColor: string ;
  @HostBinding('style.padding') padding: string = '1rem'; // = '1rem' sets the default

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
    //we still need ElementRef for our ngOnInit hook, and Renderer2 used to 
    //be RendererV2.
    }

    ngOnInit() {
      this.backgroundColor = this.defaultColor;
    }

    //Decorators
    //Hostlistener will listen for events
    @HostListener('mouseenter') mouseover(eventData: Event) {
        this.backgroundColor = this.highlightColor;

    }
    @HostListener('mouseleave') mouseleave(eventData: Event) {
        this.backgroundColor = this.defaultColor;
        
    }
}
