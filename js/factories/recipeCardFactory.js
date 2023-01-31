export function recipeCardFactory(data) {
  const { name, ingredients, time, description } = data;

  // Function that will generate the recipe card header innerHTML
  function getRecipeCardHeaderDOM() {
    const recipeCardHeaderDOM = `
    <div class="recipes-card-header">
        <p class="recipes-card-title">${name}</p>
        <div class="recipes-card-duration">
            <i class="fa-regular fa-clock"></i>
            <p>${time} min</p>
        </div>
    </div>
    `;
    return recipeCardHeaderDOM;
  }

  // Function that will generate the recipe card desc innerHTML
  function getRecipeCardDescDOM() {
    let recipeCardIngredients = "";

    ingredients.forEach((element) => {
      const recipeName = element.ingredient;
      const recipeQty = element.quantity ? element.quantity : "";
      const recipeUnit = element.unit ? element.unit : "";

      recipeCardIngredients += `
        <li class="recipes-card-ingredients-item">
            <p class="recipes-card-ingredients-name">${recipeName}:</p>
            <p class="recipes-card-ingredients-qty">${recipeQty} ${recipeUnit}</p>
        </li>
        `;
    });

    const recipeCardDescDOM = `
    <div class="recipes-card-desc">
        <ul class="recipes-card-ingredients">
        ${recipeCardIngredients}
        </ul>
        <p class="recipes-card-todo">${description}</p>
    </div>
    `;

    return recipeCardDescDOM;
  }

  // Function that will return a DOM element for the recipe card
  function getRecipeCardDOM() {
    const listitem = document.createElement("li");
    listitem.className += "recipes-card";

    const recipesCardImg = document.createElement("div");
    recipesCardImg.className += "recipes-card-img";

    const recipesCardInfo = document.createElement("div");
    recipesCardInfo.className += "recipes-card-info";

    recipesCardInfo.innerHTML += getRecipeCardHeaderDOM();
    recipesCardInfo.innerHTML += getRecipeCardDescDOM();

    listitem.append(recipesCardImg);
    listitem.append(recipesCardInfo);

    return listitem;
  }

  return { getRecipeCardDOM };
}
