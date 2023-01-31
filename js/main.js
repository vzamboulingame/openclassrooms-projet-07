import { recipesArray } from "./data/recipes.js";
import { recipeCardFactory } from "./factories/recipeCardFactory.js";

let filteredRecipesArray = recipesArray;

// Function to render recipe cards list
function renderRecipeCards(array) {
  const recipeCardsList = document.querySelector(".recipes");

  // Iterate through each recipe item in the array
  array.forEach((recipe) => {
    // Create a recipe card model object from the recipe array
    const recipeCardModel = recipeCardFactory(recipe);
    // Get the DOM element for the recipe card
    const recipeCardDOM = recipeCardModel.getRecipeCardDOM();
    // Add the card to the recipe cards list
    recipeCardsList.append(recipeCardDOM);
  });
}

renderRecipeCards(filteredRecipesArray);
