/**
 * Function to get sorted distinct ingredients array
 * @param {array} array
 * @returns {array}
 */
export function getIngredientsArray(array) {
  return Array.from(
    new Set(
      array.flatMap((recipe) =>
        recipe.ingredients.map((ingredient) =>
          ingredient.ingredient.toLowerCase()
        )
      )
    )
  ).sort();
}

/**
 * Function to get sorted distinct appliances array
 * @param {array} array
 * @returns {array}
 */
export function getAppliancesArray(array) {
  return Array.from(
    new Set(array.map((recipe) => recipe.appliance.toLowerCase()))
  ).sort();
}

/**
 * Function to get sorted distinct ustensils array
 * @param {array} array
 * @returns {array}
 */
export function getUstensilsArray(array) {
  return Array.from(
    new Set(
      array.flatMap((recipe) =>
        recipe.ustensils.map((ustensil) => ustensil.toLowerCase())
      )
    )
  ).sort();
}
