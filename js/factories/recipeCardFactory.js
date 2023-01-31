export function recipeCardFactory(data) {
  // Destructuring the data object to extract its properties
  const { id, name, ingredients, time, description } = data;

  // Function that will return a DOM element for the recipe card
  function getRecipeCardDOM() {
    // Create a list item element to contain the media card
    const listitem = document.createElement("li");
    listitem.className += "recipes-card";
    listitem.id = id;

    // Generate the innerHTML of the list item element to contain the recipe card
    listitem.innerHTML = `
    <div class="recipes-card-img"></div>
    <div class="recipes-card-info">
      <div class="recipes-card-header">
        <p class="recipes-card-title">${name}</p>
        <div class="recipes-card-duration">
          <i class="fa-regular fa-clock"></i>
          <p>${time} min</p>
        </div>
      </div>
      <div class="recipes-card-desc">
        <ul class="recipes-card-ingredients">
          <li class="recipes-card-ingredients-item">
            <p class="recipes-card-ingredients-name">Ingrédient:</p>
            <p class="recipes-card-ingredients-qty">100g</p>
          </li>
          <li class="recipes-card-ingredients-item">
            <p class="recipes-card-ingredients-name">Ingrédient:</p>
            <p class="recipes-card-ingredients-qty">100g</p>
          </li>
          <li class="recipes-card-ingredients-item">
            <p class="recipes-card-ingredients-name">Ingrédient:</p>
            <p class="recipes-card-ingredients-qty">100g</p>
          </li>
          <li class="recipes-card-ingredients-item">
            <p class="recipes-card-ingredients-name">Ingrédient:</p>
            <p class="recipes-card-ingredients-qty">100g</p>
          </li>
        </ul>
        <p class="recipes-card-todo">${description}</p>
      </div>
    </div>
      `;

    // Return the listitem element
    return listitem;
  }

  // Returning an object with the getRecipeCardDOM function
  return { getRecipeCardDOM };
}
