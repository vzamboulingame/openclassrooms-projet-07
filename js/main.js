import { recipesArray } from "./data/recipes.js";
import {
  getIngredientsArray,
  getAppliancesArray,
  getUstensilsArray,
} from "./utils/getFilterArrays.js";
import { recipeCardFactory } from "./factories/recipeCardFactory.js";
import { filterListItemFactory } from "./factories/filterListItemFactory.js";
import { formTagSpanFactory } from "./factories/formTagSpanFactory.js";

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
function renderFilterListItems(id, array) {
  const filterList = document.getElementById(id);

  array.forEach((tag) => {
    const filterListItemModel = filterListItemFactory(tag);
    const filterListItemDOM = filterListItemModel.getFilterListItemDOM();

    filterList.append(filterListItemDOM);
  });
}

// Function to render filter tag spans
function renderFormTagSpan(tag, color) {
  const formTagContainer = document.querySelector(".form-tag-container");

  const formTagSpanModel = formTagSpanFactory(tag, color);
  const formTagSpanDOM = formTagSpanModel.getFormTagSpanDOM();

  formTagContainer.append(formTagSpanDOM);
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
      if (e.target && e.target.classList == "form-filter-list-item") {
        const filterTag = e.target.textContent;
        const filterTagColor = window
          .getComputedStyle(e.target.parentElement.parentElement)
          .getPropertyValue("background-color");

        filterTagArray.push(filterTag);
        renderFormTagSpan(filterTag, filterTagColor);

        closeFormFilterDropdown(element);
      }
    });
  });
}

renderRecipeCards(filteredRecipesArray);

renderFilterListItems("ingredientsList", ingredientsArray);
renderFilterListItems("appliancesList", appliancesArray);
renderFilterListItems("ustensilsList", ustensilsArray);

addFormFilterListeners();
