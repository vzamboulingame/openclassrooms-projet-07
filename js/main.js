import { recipesArray } from "./data/recipes.js";
import {
  getIngredientsArray,
  getAppliancesArray,
  getUstensilsArray,
} from "./utils/getFilterArrays.js";
import { recipeCardFactory } from "./factories/recipeCardFactory.js";
import { filterListItemFactory } from "./factories/filterListItemFactory.js";

var filteredRecipesArray = recipesArray;

var ingredientsArray = getIngredientsArray(filteredRecipesArray);
var appliancesArray = getAppliancesArray(filteredRecipesArray);
var ustensilsArray = getUstensilsArray(filteredRecipesArray);

// Function to render recipe cards list
function renderRecipeCards(array) {
  const recipeCardsList = document.querySelector(".recipes");

  array.forEach((recipe) => {
    const recipeCardModel = recipeCardFactory(recipe);
    const recipeCardDOM = recipeCardModel.getRecipeCardDOM();
    recipeCardsList.append(recipeCardDOM);
  });
}

// Function to render filter tag list
function renderFilterListItems(filterListId, filterTagArray) {
  const filterList = document.getElementById(filterListId);
  filterList.innerHTML = "";

  filterTagArray.forEach((tag) => {
    const filterListItemModel = filterListItemFactory(tag);
    const filterListItemDOM = filterListItemModel.getFilterListItemDOM();

    filterList.append(filterListItemDOM);
  });
}

// Function to add event listeners to form filter elements
async function addFormFilterListeners() {
  const formFilterContainers = document.querySelectorAll(
    ".form-filter-container"
  );

  await renderFilterListItems("ingredientsList", ingredientsArray);
  await renderFilterListItems("appliancesList", appliancesArray);
  await renderFilterListItems("ustensilsList", ustensilsArray);

  formFilterContainers.forEach((element) => {
    const formFilterContainer = element;
    const formFilterInput =
      formFilterContainer.querySelector(".form-filter-input");
    const formFilterList =
      formFilterContainer.querySelector(".form-filter-list");
    const formFilterChevron = formFilterContainer.querySelector(
      ".form-filter-chevron"
    );

    formFilterInput.addEventListener("focus", () => {
      formFilterContainer.classList.add("form-filter-dropdown");
      formFilterChevron.classList.replace("fa-chevron-down", "fa-chevron-up");
      formFilterList.style.display = "grid";
      formFilterList.setAttribute("aria-hidden", "false");
    });

    formFilterInput.addEventListener("blur", () => {
      formFilterContainer.classList.remove("form-filter-dropdown");
      formFilterChevron.classList.replace("fa-chevron-up", "fa-chevron-down");
      formFilterList.style.display = "none";
      formFilterList.setAttribute("aria-hidden", "true");
    });
  });
}

renderRecipeCards(filteredRecipesArray);

addFormFilterListeners();
