import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnlessDirective]'
})
export class UnlessDirectiveDirective {
  @Input() set appUnless(condition: boolean) {
    if (condition) {
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();

    }
  }
  // this is still a property even though it is also a method.

  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { 


  }

}
