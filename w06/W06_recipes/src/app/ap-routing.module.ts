import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RecipeBookComponent } from "./recipe-book/recipe-book.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes'},
    { path: 'recipes', component: RecipeBookComponent}, //recipes path
    { path: 'shopping-list', component: ShoppingListComponent} //recipes path
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}