import {
  getIngredientsArray,
  getAppliancesArray,
  getUstensilsArray,
} from "./getFilterArrays.js";

/**
 * Function to search an array of tags in ingredients, appliances, and ustensils
 * @param {array} tagArray
 * @param {array} recipesArray
 * @returns {array}
 */
export function searchRecipes(tagArray, recipesArray) {
  return recipesArray.filter((recipe) => {
    const ingredients = getIngredientsArray([recipe]);
    const appliances = getAppliancesArray([recipe]);
    const ustensils = getUstensilsArray([recipe]);
    return tagArray.every(
      (tag) =>
        ingredients.includes(tag) ||
        appliances.includes(tag) ||
        ustensils.includes(tag)
    );
  });
}
