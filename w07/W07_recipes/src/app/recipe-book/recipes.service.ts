import { Injectable } from "@angular/core";
//import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shoppingList.service";
import { Recipe } from "./recipe.model";

@Injectable()

export class RecipeService {
    //recipeSelected = new Subject<Recipe>();

    recipes: Recipe[] = [
        new Recipe('A Test Recipe', 
            'this is just a test', 
            'https://2.bp.blogspot.com/_eKI_F9z5UFE/TJ-uGTqfgVI/AAAAAAAABkw/_Huq4NrH9EQ/s1600/Pumpkin+Bread+Recipe.jpg', 
            [
                new Ingredient('Sugar', 3),
                new Ingredient('Eggs - Beaten', 4),
                new Ingredient('Oil', 1),
                new Ingredient('Salt tsp', 0.5),
                new Ingredient('Cinnamon tsp', 1),
                new Ingredient('Nutmeg tsp', 1),
                new Ingredient('Water', 0.66),
                new Ingredient('Canned Pumpkin 15oz', 1),
                new Ingredient('Flour', 3.5),
                new Ingredient('Baking Soda tsp', 2)
            ]),
        new Recipe('Banana Bread', 
            'The NumNum of B-Bread', 
            'https://i.etsystatic.com/5244457/r/il/f1a6a8/3770781379/il_794xN.3770781379_9xsz.jpg', 
            [
                new Ingredient('Flour', 3.5),
                new Ingredient('Baking Soda tsp', 2)
            ])
    ];

    constructor(private shoppingListService: ShoppingListService) {}
    
    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes.slice()[index];
    }


    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

}