/**
 * Takes a keyword and a recipes array as parameters, then filters the recipes array
 * based on the keyword, and returns a filtered array of matching recipes
 *
 * @param {string} keyword - The keyword that the user is searching for
 * @param {array} array - The array of recipes to search through
 * @returns {array} - An array of recipes that match the keyword.
 */
export function searchRecipesWithKeyword(keyword, array) {
  const filteredRecipes = [];

  for (let i = 0; i < array.length; i++) {
    const recipe = array[i];

    const nameWithKeyword = recipe.name
      .toLowerCase()
      .includes(keyword.toLowerCase());
    const descriptionWithKeyword = recipe.description
      .toLowerCase()
      .includes(keyword.toLowerCase());

    let ingredientsWithKeyword = false;

    for (let n = 0; n < recipe.ingredients.length; n++) {
      const ingredient = recipe.ingredients[n];

      if (ingredient.ingredient.toLowerCase().includes(keyword.toLowerCase())) {
        ingredientsWithKeyword = true;
        break;
      }
    }

    if (nameWithKeyword || descriptionWithKeyword || ingredientsWithKeyword) {
      filteredRecipes.push(recipe);
    }
  }

  return filteredRecipes;
}
