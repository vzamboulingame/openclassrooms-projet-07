/**
 * Takes a keyword and a recipes array as parameters, then filters the recipes array
 * based on the keyword, and returns a filtered array of matching recipes
 *
 * @param {string} keyword - The keyword that the user is searching for
 * @param {array} array - The array of recipes to search through
 * @returns {array} - An array of recipes that match the keyword.
 */
export function searchRecipesWithKeyword(keyword, array) {
  const filteredRecipes = array.filter((recipe) => {
    const nameWithKeyword = recipe.name
      .toLowerCase()
      .includes(keyword.toLowerCase());
    const descriptionWithKeyword = recipe.description
      .toLowerCase()
      .includes(keyword.toLowerCase());
    const ingredientsWithKeyword = recipe.ingredients.some((ingredient) =>
      ingredient.ingredient.toLowerCase().includes(keyword.toLowerCase())
    );

    return nameWithKeyword || descriptionWithKeyword || ingredientsWithKeyword;
  });

  return filteredRecipes;
}
