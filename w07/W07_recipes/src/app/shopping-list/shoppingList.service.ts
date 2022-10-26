// import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from 'rxjs';


export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>(); //Changed to subject from eventemitter

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Oranges', 2),
        new Ingredient('Pie Crust', 3),
        new Ingredient('Brown Sugar', 1),
        new Ingredient('Cinnamon', 1)
      ];
    
    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice()); //emit changed to next for our emitter to subject change 
    }

    addIngredients(ingredients: Ingredient[]) {
        // Option 1
        // for (let ingredient of ingredients) {
        //     this.addIngredient(ingredient);
        // }

        //Option 2 - ES6 Feature "spread" done with "..." turn an array into a list
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice()); //emit changed to next for our emitter to subject change 
    }

}