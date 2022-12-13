import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GiftResolver } from 'backend/gift-resolver.service';
import { GiftCardComponent } from './gifts/gift-card/gift-card.component';
import { GiftDetailComponent } from './gifts/gift-detail/gift-detail.component';
import { GiftsComponent } from './gifts/gifts.component';
import { HomeComponent } from './home/home.component';
//import { ListsComponent } from './lists/lists.component';
import { PeopleComponent } from './people/people.component';
import { PersonDetailComponent } from './people/person-detail/person-detail.component';
import { PersonNewComponent } from './people/person-new/person-new.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'people', component: PeopleComponent, children: [
    {path: 'new', component: PersonNewComponent},
    {path: ':pNumber', component: PersonDetailComponent}
  ]},
  //{path: 'lists', component: ListsComponent},
  {path: 'gifts', component: GiftsComponent, resolve: {Gifter: GiftResolver}, children: [
    {path: 'giftcards', component: GiftCardComponent, resolve: {Gifter: GiftResolver}},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
