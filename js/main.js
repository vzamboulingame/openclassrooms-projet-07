import { recipesArray } from "./data/recipes.js";
import { recipeCardFactory } from "./factories/recipeCardFactory.js";

let filteredRecipesArray = recipesArray;

const uniqueIngredientsArray = Array.from(
  new Set(
    recipesArray.flatMap((recipe) =>
      recipe.ingredients.map((ingredient) => ingredient.ingredient)
    )
  )
).sort();

const uniqueAppliancesArray = Array.from(
  new Set(recipesArray.map((recipe) => recipe.appliance))
).sort();

const uniqueUstensilsArray = Array.from(
  new Set(recipesArray.flatMap((recipe) => recipe.ustensils))
).sort();

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
