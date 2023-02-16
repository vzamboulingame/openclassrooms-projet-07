/**
 * Takes an array of recipes as parameter, flattens the ingredients array of each recipe,
 * maps the ingredient name to lowercase, removes duplicates and returns an array of
 * distinct ingredients sorted alphabetically
 *
 * @param {array} array - The array of recipes that we want to get the ingredients from
 * @returns {array} - An array of distinct ingredients sorted alphabetically
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
 * Takes an array of recipes as parameter, maps the appliances name of each recipe to lowercase,
 * removes duplicates and returns an array of distinct appliances sorted alphabetically
 *
 * @param {array} array - The array of recipes that we want to get the appliances from
 * @returns {array} - An array of distinct appliances sorted alphabetically
 */
export function getAppliancesArray(array) {
  return Array.from(
    new Set(array.map((recipe) => recipe.appliance.toLowerCase()))
  ).sort();
}

/**
 * Takes an array of recipes as parameter, flattens the array of ustensils of each recipe, maps the ustensils
 * name to lowercase, removes duplicates and returns an array of distinct ustensils sorted alphabetically
 *
 * @param {array} array - The array of recipes that we want to get the ustensils from
 * @returns {array} - An array of distinct ustensils sorted alphabetically
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
