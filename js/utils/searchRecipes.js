import {
  getIngredientsArray,
  getAppliancesArray,
  getUstensilsArray,
} from "./getFilterArrays.js";

/**
 * Takes a tagArray and a recipesArray as parameters, then it filters the recipesArray to keep only
 * the recipes that have all the tags in the tagArray
 *
 * @param {array} tagArray - An array of tags
 * @param {array} recipesArray - An array of recipes
 * @returns {array} - An array of recipes that match the search criteria
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
