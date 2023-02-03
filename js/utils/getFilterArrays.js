// Function to get ingredients array
export function getIngredientsArray(array) {
  return Array.from(
    new Set(
      array.flatMap((recipe) =>
        recipe.ingredients.map((ingredient) => ingredient.ingredient)
      )
    )
  ).sort();
}

// Function to get appliances array
export function getAppliancesArray(array) {
  return Array.from(new Set(array.map((recipe) => recipe.appliance))).sort();
}

// Function to get ustensils array
export function getUstensilsArray(array) {
  return Array.from(
    new Set(array.flatMap((recipe) => recipe.ustensils))
  ).sort();
}
