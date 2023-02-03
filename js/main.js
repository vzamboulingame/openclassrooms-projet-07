import { recipesArray } from "./data/recipes.js";
import {
  getIngredientsArray,
  getAppliancesArray,
  getUstensilsArray,
} from "./utils/getFilterArrays.js";
import { recipeCardFactory } from "./factories/recipeCardFactory.js";
import { filterListItemFactory } from "./factories/filterListItemFactory.js";

const filteredRecipesArray = recipesArray;
const ingredientsArray = getIngredientsArray(filteredRecipesArray);
const appliancesArray = getAppliancesArray(filteredRecipesArray);
const ustensilsArray = getUstensilsArray(filteredRecipesArray);

// Function to render recipe cards list
function renderRecipeCards(array) {
  const recipeCardsList = document.querySelector(".recipes");

  array.forEach((recipe) => {
    const recipeCardModel = recipeCardFactory(recipe);
    const recipeCardDOM = recipeCardModel.getRecipeCardDOM();
    recipeCardsList.append(recipeCardDOM);
  });
}

// Function to render filter list items
function renderFilterListItems(listId, tagArray) {
  const filterList = document.getElementById(`${listId}`);

  console.log(filterList);

  tagArray.forEach((tag) => {
    const filterListItemModel = filterListItemFactory(tag);
    const filterListItemDOM = filterListItemModel.getRecipeCardDOM();
    filterList.append(filterListItemDOM);
  });
}

const formFilterInputs = document.querySelectorAll(".form-filter-input");

formFilterInputs.forEach((element) => {
  element.addEventListener("focus", (e) => {
    e.target.parentElement.parentElement.classList.add("form-filter-dropdown");
  });

  element.addEventListener("blur", (e) => {
    e.target.parentElement.parentElement.classList.remove(
      "form-filter-dropdown"
    );
  });
});

renderRecipeCards(filteredRecipesArray);

console.log(ingredientsArray);
console.log(appliancesArray);
console.log(ustensilsArray);
