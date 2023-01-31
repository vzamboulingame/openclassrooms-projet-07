import { recipesArray } from "./data/recipes.js";
import { recipeCardFactory } from "./factories/recipeCardFactory.js";

let filteredRecipesArray = recipesArray;

// Function to render recipe cards list
function renderRecipeCards(array) {
  const recipeCardsList = document.querySelector(".recipes");

  array.forEach((recipe) => {
    const recipeCardModel = recipeCardFactory(recipe);
    const recipeCardDOM = recipeCardModel.getRecipeCardDOM();
    recipeCardsList.append(recipeCardDOM);
  });
}

renderRecipeCards(filteredRecipesArray);
