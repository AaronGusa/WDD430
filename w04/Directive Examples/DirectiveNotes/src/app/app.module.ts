import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BasicHighlightDirective } from './basicDirectives/basic-highlight.directive';
import { BetterHighlightDirective } from './basicDirectives/highlight.directive';
import { BestHighlightDirective } from './basicDirectives/best-highlight.directive';
import { CustomBindingDirective } from './basicDirectives/custom-binding.directive';
import { CustomAliasBindDirective } from './basicDirectives/custom-alias-bind.directive';
import { UnlessDirective } from './structuralDirectives/unless.directive';

@NgModule({
  declarations: [
    AppComponent,
    BasicHighlightDirective,
    BetterHighlightDirective,
    BestHighlightDirective,
    CustomBindingDirective,
    CustomAliasBindDirective,
    UnlessDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
