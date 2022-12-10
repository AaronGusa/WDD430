import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgMaterialModule } from './ng-material/ng-material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PeopleComponent } from './people/people.component';
import { ListsComponent } from './lists/lists.component';
import { GiftsComponent } from './gifts/gifts.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { PersonDetailComponent } from './people/person-detail/person-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { GiftDetailComponent } from './gifts/gift-detail/gift-detail.component';
import { GiftCardComponent } from './gifts/gift-card/gift-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PeopleComponent,
    ListsComponent,
    GiftsComponent,
    HomeComponent,
    FooterComponent,
    PersonDetailComponent,
    GiftDetailComponent,
    GiftCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgMaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
