import {
  getIngredientsArray,
  getAppliancesArray,
  getUstensilsArray,
} from "./getFilterArrays.js";

/**
 * Function to search a keyword in ingredients, appliances, and ustensils
 * @param {string} keyword
 * @param {array} recipesArray
 * @returns {array}
 */
export function searchRecipes(keyword, recipesArray) {
  keyword = keyword.toLowerCase();

  return recipesArray.filter((recipe) => {
    const ingredients = getIngredientsArray([recipe]);
    const appliances = getAppliancesArray([recipe]);
    const ustensils = getUstensilsArray([recipe]);
    return (
      ingredients.includes(keyword) ||
      appliances.includes(keyword) ||
      ustensils.includes(keyword)
    );
  });
}
