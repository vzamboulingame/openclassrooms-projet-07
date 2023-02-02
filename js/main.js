import { recipesArray } from "./data/recipes.js";
import { recipeCardFactory } from "./factories/recipeCardFactory.js";

let filteredRecipesArray = recipesArray;

// Function to get unique ingredients array
function getUniqueIngredientsArray(array) {
  const uniqueIngredientsArray = Array.from(
    new Set(
      array.flatMap((recipe) =>
        recipe.ingredients.map((ingredient) => ingredient.ingredient)
      )
    )
  ).sort();

  return uniqueIngredientsArray;
}

// Function to get unique appliances array
function getUniqueAppliancesArray(array) {
  const uniqueAppliancesArray = Array.from(
    new Set(array.map((recipe) => recipe.appliance))
  ).sort();

  return uniqueAppliancesArray;
}

// Function to get unique ustensils array
function getUniqueUstensilsArray(array) {
  const uniqueUstensilsArray = Array.from(
    new Set(array.flatMap((recipe) => recipe.ustensils))
  ).sort();

  return uniqueUstensilsArray;
}

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
