/* IMPORTS */

import { recipesArray } from "./data/recipes.js";
import {
  getIngredientsArray,
  getAppliancesArray,
  getUstensilsArray,
} from "./utils/getFilterArrays.js";
import {
  displayHeaderMsg,
  closeHeaderMsg,
} from "./utils/displayCloseHeaderMsg.js";
import { searchRecipes } from "./utils/searchRecipes.js";
import { recipeCardFactory } from "./factories/recipeCardFactory.js";
import { filterListItemFactory } from "./factories/filterListItemFactory.js";
import { formTagSpanFactory } from "./factories/formTagSpanFactory.js";

/* VARIABLES */

const formSearchInput = document.querySelector(".form-search-input");
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

/**
 * Takes an array of recipe objects as parameter, gets the DOM element
 * for each recipe object and appends it to the recipe cards list
 *
 * @param {array} array - An array of recipe objects
 */
function renderRecipeCards(array) {
  const recipeCardsList = document.querySelector(".recipes");

  recipeCardsList.innerHTML = "";

  array.forEach((recipe) => {
    const recipeCardModel = recipeCardFactory(recipe);
    const recipeCardDOM = recipeCardModel.getRecipeCardDOM();
    recipeCardsList.append(recipeCardDOM);
  });
}

/**
 * Takes an id and an array as parameters, gets the DOM element
 * for each filter list item and appends it to the filter list element
 *
 * @param {string} id - The id of the filter list element
 * @param {array} array - An array of filter list items
 */
async function renderFilterListItems(id, array) {
  const filterList = document.getElementById(id);

  filterList.innerHTML = "";

  array.forEach((tag) => {
    const filterListItemModel = filterListItemFactory(tag);
    const filterListItemDOM = filterListItemModel.getFilterListItemDOM();

    filterList.append(filterListItemDOM);
  });
}

/**
 * Takes a tag and color as parameters, then renders the DOM element for the form tag span element,
 * appends it to the form tag container and adds an event listener to the tag span element's
 * close button that removes the tag from the filter tag array and re-renders the recipe elements
 *
 * @param {string} tag - The tag that will be rendered
 * @param {string} color - The color of the tag
 */
function renderFormTagSpan(tag, color) {
  const formTagContainer = document.querySelector(".form-tag-container");

  const formTagSpanModel = formTagSpanFactory(tag, color);
  const formTagSpanDOM = formTagSpanModel.getFormTagSpanDOM();

  formTagContainer.append(formTagSpanDOM);

  const formTagTextContent =
    formTagSpanDOM.querySelector(".form-tag-text").textContent;
  const formTagCloseBtn = formTagSpanDOM.querySelector(".form-tag-icon");

  formTagCloseBtn.addEventListener("click", () => {
    filterTagArray = filterTagArray.filter((tag) => tag != formTagTextContent);
    filteredRecipesArray = searchRecipes(filterTagArray, recipesArray);

    formTagSpanDOM.remove();

    renderAllElements();
  });
}

/**
 * Takes a filter container element as parameter and displays its filter list dropdown
 *
 * @param {object} element - The filter container element object
 */
function displayFormFilterDropdown(element) {
  const formFilterContainer = element;
  const formFilterList = formFilterContainer.querySelector(".form-filter-list");
  const formFilterChevron = formFilterContainer.querySelector(
    ".form-filter-chevron"
  );

  console.log(typeof element);

  formFilterContainer.classList.add("form-filter-dropdown");
  formFilterChevron.classList.replace("fa-chevron-down", "fa-chevron-up");
  formFilterList.style.display = "grid";
  formFilterList.setAttribute("aria-hidden", "false");
}

/**
 * Takes a filter container element as parameter and closes its filter list dropdown
 *
 * @param {object} element - The filter container element object
 */
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

/**
 * Refreshes the ingredientsArray, appliancesArray, ustensilsArray arrays from the
 * filtered recipes array and updates the listArrayMapping array of objects
 */
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

/**
 * Refresh all list item arrays from the filtered recipes array and
 * re-renders the recipe cards and all the filter list tems
 */
async function renderAllElements() {
  await refreshFilterArrays();

  renderRecipeCards(filteredRecipesArray);

  listArrayMapping.forEach((element) => {
    renderFilterListItems(element.list, element.array);
  });
}

/* EVENT LISTENERS */

// Event listeners for the main search input
formSearchInput.addEventListener("input", () => {
  if (formSearchInput.value.length >= 3) {
    console.log(formSearchInput.value);
  }
});

// Event listeners for each form filter container child elements
formFilterContainers.forEach((element) => {
  const formFilterContainer = element;
  const formFilterList = formFilterContainer.querySelector(".form-filter-list");
  const formFilterInput =
    formFilterContainer.querySelector(".form-filter-input");
  const formFilterListId = formFilterList.id;

  formFilterInput.addEventListener("focus", () => {
    renderAllElements();
    displayFormFilterDropdown(element);
  });

  formFilterInput.addEventListener("blur", () => {
    closeFormFilterDropdown(element);
    formFilterInput.value = "";
  });

  formFilterInput.addEventListener("input", () => {
    refreshFilterArrays();
    const { array: formFilterListArray } = listArrayMapping.find(
      (item) => item.list == formFilterListId
    );
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

      if (!filterTagArray.includes(filterTag)) {
        filterTagArray.push(filterTag);
        filteredRecipesArray = searchRecipes(filterTagArray, recipesArray);

        renderFormTagSpan(filterTag, filterTagColor);

        closeFormFilterDropdown(element);
        formFilterInput.value = "";

        renderAllElements();
      }

      closeFormFilterDropdown(element);
      formFilterInput.value = "";
    }
  });
});

/* EXECUTION */

renderAllElements();
