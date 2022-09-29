import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'this is just a test', 'https://2.bp.blogspot.com/_eKI_F9z5UFE/TJ-uGTqfgVI/AAAAAAAABkw/_Huq4NrH9EQ/s1600/Pumpkin+Bread+Recipe.jpg'),
    new Recipe('A Test Recipe', 'this is just a test', 'https://2.bp.blogspot.com/_eKI_F9z5UFE/TJ-uGTqfgVI/AAAAAAAABkw/_Huq4NrH9EQ/s1600/Pumpkin+Bread+Recipe.jpg')
  ];



  constructor() { }

  ngOnInit(): void {
  }

}
