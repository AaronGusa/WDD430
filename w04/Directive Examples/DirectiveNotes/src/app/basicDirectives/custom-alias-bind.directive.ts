import { Directive, HostBinding, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appCustomAliasBind]'
})
export class CustomAliasBindDirective implements OnInit {
  @Input() defaultColor: string = 'transparent';
  @Input('appCustomAliasBind') highlightColor: string = 'pink';
  //set alias as the directive selector

  @HostBinding('style.backgroundColor') backgroundColor: string ;
  @HostBinding('style.padding') padding: string = '1rem'; // = '1rem' sets the default

  constructor() {}

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
