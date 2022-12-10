import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GiftDetailComponent } from './gifts/gift-detail/gift-detail.component';
import { GiftsComponent } from './gifts/gifts.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { PeopleComponent } from './people/people.component';
import { PersonDetailComponent } from './people/person-detail/person-detail.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'people', component: PeopleComponent, children: [
    {path: ':id', component: PersonDetailComponent}
  ]},
  {path: 'lists', component: ListsComponent},
  {path: 'gifts', component: GiftsComponent},
  {path: 'gifts/:id', component: GiftDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
