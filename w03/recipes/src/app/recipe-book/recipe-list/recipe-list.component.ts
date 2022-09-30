import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'this is just a test', 'https://2.bp.blogspot.com/_eKI_F9z5UFE/TJ-uGTqfgVI/AAAAAAAABkw/_Huq4NrH9EQ/s1600/Pumpkin+Bread+Recipe.jpg'),
    new Recipe('Banana Bread', 'The NumNum of B-Bread', 'https://i.etsystatic.com/5244457/r/il/f1a6a8/3770781379/il_794xN.3770781379_9xsz.jpg')
  ];



  constructor() { }

  ngOnInit(): void {
  }

  
  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

}
