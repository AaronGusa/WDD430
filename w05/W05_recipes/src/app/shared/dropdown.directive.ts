import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]' //square brackets make it an attribute selector
})
export class DropdownDirective {
  //want it to add a css property
  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }


  constructor() { }

}
