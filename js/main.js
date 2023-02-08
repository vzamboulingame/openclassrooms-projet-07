import { recipesArray } from "./data/recipes.js";
import {
  getIngredientsArray,
  getAppliancesArray,
  getUstensilsArray,
} from "./utils/getFilterArrays.js";
import { recipeCardFactory } from "./factories/recipeCardFactory.js";
import { filterListItemFactory } from "./factories/filterListItemFactory.js";

let filteredRecipesArray = recipesArray;

let ingredientsArray = getIngredientsArray(filteredRecipesArray);
let appliancesArray = getAppliancesArray(filteredRecipesArray);
let ustensilsArray = getUstensilsArray(filteredRecipesArray);

let filterTagArray = [];

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
function renderFilterListItems(filterListId, filterTagArray) {
  const filterList = document.getElementById(filterListId);

  filterTagArray.forEach((tag) => {
    const filterListItemModel = filterListItemFactory(tag);
    const filterListItemDOM = filterListItemModel.getFilterListItemDOM();

    filterList.append(filterListItemDOM);
  });
}

// Function to display filter dropdown
function displayFormFilterDropdown(element) {
  const formFilterContainer = element;
  const formFilterList = formFilterContainer.querySelector(".form-filter-list");
  const formFilterChevron = formFilterContainer.querySelector(
    ".form-filter-chevron"
  );

  formFilterContainer.classList.add("form-filter-dropdown");
  formFilterChevron.classList.replace("fa-chevron-down", "fa-chevron-up");
  formFilterList.style.display = "grid";
  formFilterList.setAttribute("aria-hidden", "false");
}

// Function to close filter dropdown
function closeFormFilterDropdown(element) {
  const formFilterContainer = element;
  const formFilterList = formFilterContainer.querySelector(".form-filter-list");
  const formFilterChevron = formFilterContainer.querySelector(
    ".form-filter-chevron"
  );

  formFilterContainer.classList.remove("form-filter-dropdown");
  formFilterChevron.classList.replace("fa-chevron-up", "fa-chevron-down");
  formFilterList.style.display = "none";
  formFilterList.setAttribute("aria-hidden", "true");
}

// Function to add event listeners to form filter elements
function addFormFilterListeners() {
  const formFilterContainers = document.querySelectorAll(
    ".form-filter-container"
  );

  formFilterContainers.forEach((element) => {
    const formFilterContainer = element;
    const formFilterList =
      formFilterContainer.querySelector(".form-filter-list");
    const formFilterInput =
      formFilterContainer.querySelector(".form-filter-input");

    formFilterInput.addEventListener("focus", () => {
      displayFormFilterDropdown(element);
    });

    formFilterInput.addEventListener("blur", () => {
      closeFormFilterDropdown(element);
    });

    formFilterList.addEventListener("mousedown", (e) => {
      filterTagArray.push(e.target.textContent);
      console.log(filterTagArray);
      closeFormFilterDropdown(element);
    });
  });
}

renderRecipeCards(filteredRecipesArray);

renderFilterListItems("ingredientsList", ingredientsArray);
renderFilterListItems("appliancesList", appliancesArray);
renderFilterListItems("ustensilsList", ustensilsArray);

addFormFilterListeners();
