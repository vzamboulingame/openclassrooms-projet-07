/* IMPORTS */

import { recipesArray } from "./data/recipes.js";
import {
  getIngredientsArray,
  getAppliancesArray,
  getUstensilsArray,
} from "./utils/getFilterArrays.js";
import { recipeCardFactory } from "./factories/recipeCardFactory.js";
import { filterListItemFactory } from "./factories/filterListItemFactory.js";
import { formTagSpanFactory } from "./factories/formTagSpanFactory.js";

/* VARIABLES */

const formFilterContainers = document.querySelectorAll(
  ".form-filter-container"
);

let filteredRecipesArray = recipesArray;

let ingredientsArray = getIngredientsArray(filteredRecipesArray);
let appliancesArray = getAppliancesArray(filteredRecipesArray);
let ustensilsArray = getUstensilsArray(filteredRecipesArray);

let listArrayMapping = [
  { list: "ingredientsList", array: ingredientsArray },
  { list: "appliancesList", array: appliancesArray },
  { list: "ustensilsList", array: ustensilsArray },
];

let filterTagArray = [];

/* FUNCTIONS */

// Function to render recipe cards list
function renderRecipeCards(array) {
  const recipeCardsList = document.querySelector(".recipes");

  recipeCardsList.innerHTML = "";

  array.forEach((recipe) => {
    const recipeCardModel = recipeCardFactory(recipe);
    const recipeCardDOM = recipeCardModel.getRecipeCardDOM();
    recipeCardsList.append(recipeCardDOM);
  });
}

// Function to render filter list items
function renderFilterListItems(id, array) {
  const filterList = document.getElementById(id);

  filterList.innerHTML = "";

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

// Function to refresh all filter arrays data
async function refreshFilterArrays() {
  ingredientsArray = await getIngredientsArray(filteredRecipesArray);
  appliancesArray = await getAppliancesArray(filteredRecipesArray);
  ustensilsArray = await getUstensilsArray(filteredRecipesArray);

  listArrayMapping = [
    { list: "ingredientsList", array: ingredientsArray },
    { list: "appliancesList", array: appliancesArray },
    { list: "ustensilsList", array: ustensilsArray },
  ];
}

// Function to render all elements
async function renderAllElements() {
  await refreshFilterArrays();

  renderRecipeCards(filteredRecipesArray);

  listArrayMapping.forEach((element) => {
    renderFilterListItems(element.list, element.array);
  });
}

// Function to filter recipes with tags from filterTagArray
function filterRecipesFromTags(recipeArray, tagArray) {
  return recipeArray.filter((recipe) => {
    return tagArray.some((tag) => {
      return Object.values(recipe).some((value) => {
        return (
          typeof value === "string" &&
          value.toLowerCase().includes(tag.toLowerCase())
        );
      });
    });
  });
}

/* EVENT LISTENERS */
formFilterContainers.forEach((element) => {
  const formFilterContainer = element;
  const formFilterList = formFilterContainer.querySelector(".form-filter-list");
  const formFilterInput =
    formFilterContainer.querySelector(".form-filter-input");
  const formFilterListId = formFilterList.id;
  const { array: formFilterListArray } = listArrayMapping.find(
    (item) => item.list == formFilterListId
  );

  formFilterInput.addEventListener("focus", () => {
    displayFormFilterDropdown(element);
    renderFilterListItems(formFilterListId, formFilterListArray);
  });

  formFilterInput.addEventListener("blur", () => {
    closeFormFilterDropdown(element);
    formFilterInput.value = "";
  });

  formFilterInput.addEventListener("input", () => {
    const filteredListArray = formFilterListArray.filter((item) =>
      item.toLowerCase().includes(formFilterInput.value.toLowerCase())
    );

    renderFilterListItems(formFilterListId, filteredListArray);
  });

  formFilterList.addEventListener("mousedown", (e) => {
    if (e.target && e.target.classList == "form-filter-list-item") {
      const filterTag = e.target.textContent;
      const filterTagColor = window
        .getComputedStyle(e.target.parentElement.parentElement)
        .getPropertyValue("background-color");

      filterTagArray.push(filterTag);
      filteredRecipesArray = filterRecipesFromTags(
        filteredRecipesArray,
        filterTagArray
      );

      renderFormTagSpan(filterTag, filterTagColor);
      closeFormFilterDropdown(element);
      formFilterInput.value = "";

      renderAllElements();
    }
  });
});

/* EXECUTION */

renderAllElements();
